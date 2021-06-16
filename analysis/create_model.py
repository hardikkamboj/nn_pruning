from pathlib import Path
import json
import sh
import shutil
from transformers import BertForQuestionAnswering, TFBertForQuestionAnswering
from tempfile import TemporaryDirectory
from nn_pruning.inference_model_patcher import optimize_model
from analysis.model_card_graphics import PruningInfoBokehPlotter, DensityBokehPlotter
import jinja2

import sys
indent = 4
if sys.version_info.major == 3 and 4 <= sys.version_info.minor <= 8:
  import analysis._make_iterencode as _make_iterencode
  json.encoder._make_iterencode = _make_iterencode._make_iterencode
  indent = (4, None)

from examples.question_answering.qa_sparse_xp import QASparseXP
from examples.text_classification.glue_sparse_xp import GlueSparseXP

def pretty_json(p):
    return json.dumps(p, sort_keys=True, indent=indent, separators = [", ", ": "])

class PackagerException(Exception):
    pass

class BadF1ModelException(PackagerException):
    pass

import contextlib
import os

@contextlib.contextmanager
def cd(path):
   old_path = os.getcwd()
   os.chdir(path)
   try:
       yield
   finally:
       os.chdir(old_path)

class Packager:
    ORIGINAL_FILES = ["special_tokens_map.json",
                      "tokenizer_config.json",
                      "vocab.txt"]

    TRAINING_DIR = "training"
    TRAINING_FILES =["data_args.json",
                     "model_args.json",
                     "sparse_args.json",
                     "training_args.bin"]

    EVAL_DIR = "eval"
    EVAL_FILES = {"squadv2": ["eval_metrics.json",
                              "evaluate_timing.json",
                              "nbest_predictions.json",
                              "null_odds.json",
                              "predictions.json",
                              "sparsity_report.json",
                              "speed_report.json"],
                  "squadv1": ["eval_metrics.json",
                              "evaluate_timing.json",
                              "nbest_predictions.json",
                              "predictions.json",
                              "sparsity_report.json",
                              "speed_report.json"]
                  }

    def __init__(self,
                 owner_name,
                 info_filepath,
                 checkpoint_path,
                 git_base_path,
                 kind,
                 task
                 ):
        self.info_filepath = Path(info_filepath).resolve()
        self.checkpoint_path = checkpoint_path
        self.git_base_path = Path(git_base_path).resolve()
        self.version = 1
        self.model_owner_name = owner_name
        self.kind = kind
        self.task = task

    @classmethod
    def build_model_name_(cls, base_name, task, speedup, precision, linear_sparsity, kind, is_ampere, version):
        density = int(100 - linear_sparsity)

        name = f"{base_name}-{task}-x{speedup:.2f}-f{precision:.1f}-d{density}-{kind}"
        if is_ampere:
            name += "-ampere"

        name += f"-v{version}"
        return name

    def get_speedup(self):
        speedup = self.checkpoint_info["speedup"]
        if "bert-large" in self.base_name:
            # TEMPORARY: speed ratio between bert-large and bert-base
            speedup /= 0.3221111545868855
        return speedup

    def get_original_model_size_mb(self):
        if "bert-base" in self.base_name:
            original_model_size = 420 * 1024**2
        elif "bert-large" in self.base_name:
            original_model_size = 1.2*1024**3
        else:
            raise Exception(f"Unknown model type {self.base_name}")
        return original_model_size

    def build_model_name(self):
        checkpoint_info = self.checkpoint_info
        source_path = checkpoint_info.get("source_checkpoint")
        if source_path is not None:
            print(source_path)
            source_info = self.info["checkpoints"][source_path]
            self.base_name = source_info["config"]["_name_or_path"]
        else:
            self.base_name = checkpoint_info["config"]["_name_or_path"]

        replacements = {"whole-word-masking":"wwm"}
        def replace(s, replacements):
            for k,v in replacements.items():
                s = s.replace(k,v)
            return s
        self.base_name = replace(self.base_name, replacements)

        self.is_ampere = checkpoint_info["sparse_args"]["ampere_pruning_method"] != "disabled"
        stats = checkpoint_info["stats"]
        self.sparsity = int(stats["linear_sparsity"])
        self.total_sparsity = int(stats["total_sparsity"])
        self.density = int(100 - stats["linear_sparsity"])
        self.total_density = int(100 - stats["total_sparsity"])
        speedup = self.get_speedup()

        f1 = checkpoint_info["eval_metrics"]["f1"]

        return self.build_model_name_(self.base_name, self.task, speedup, f1, stats["linear_sparsity"], self.kind, self.is_ampere, self.version)

    def load_info(self):
        with self.info_filepath.open() as f:
            info = json.load(f)

        self.info = info
        self.checkpoint_info = info["checkpoints"][self.checkpoint_path]
        self.model_name = self.build_model_name()

    def sanity_check(self):
        pass

    def create_git(self, only_name = False):
        git_path = self.git_base_path / self.model_owner_name / self.model_name
        print(git_path)
        if only_name:
            return
        if not git_path.parent.exists():
            git_path.parent.mkdir(parents=True)
        if not git_path.exists():
            sh.transformers_cli("repo", "create", "-y", f"{self.model_name}")
            with cd(git_path.parent):
                sh.git("clone", f"https://huggingface.co/{self.model_owner_name}/{self.model_name}")
        return git_path

    def get_copy_list(self):
        to_copy = [(self.ORIGINAL_FILES, self.git_path),
                   (self.TRAINING_FILES, self.git_path / self.TRAINING_DIR),
                   (self.EVAL_FILES[self.task], self.git_path / self.EVAL_DIR)]
        return to_copy

    def copy_model_files(self, force = False):
        modified = False

        src_path = self.checkpoint_path

        d = None
        try:
            if force or not (self.git_path / "tf_model.h5").exists() or not (self.git_path / "pytorch_model.bin").exists():
                if self.task.startswith("squad"):
                    d = TemporaryDirectory()
                    model = QASparseXP.compile_model(src_path, dest_path=d.name)
                    model = optimize_model(model, "heads")
                    model.save_pretrained(d.name)
                    src_path = d.name
                else:
                    raise Exception(f"Unknown task {task}")

            if force or not (self.git_path / "tf_model.h5").exists():
                with TemporaryDirectory() as d2:
                    if self.task.startswith("squad"):
                        QASparseXP.final_fine_tune_bertarize(src_path, d2, remove_head_pruning=True)
                    else:
                        raise Exception(f"Unknown task {task}")

                    tf_model = TFBertForQuestionAnswering.from_pretrained(d2, from_pt=True)
                    tf_model.save_pretrained(self.git_path)
                    modified = True

            if force or not (self.git_path / "pytorch_model.bin").exists():
                model = BertForQuestionAnswering.from_pretrained(src_path)
                model.save_pretrained(self.git_path)
                modified = True

            src_path = Path(src_path)
            to_copy = self.get_copy_list()

            for files, dest in to_copy:
                dest.mkdir(exist_ok=True)
                for file in files:
                    if force or not (dest / file).exists():
                        shutil.copyfile(str(src_path / file), str(dest / file))
                        modified = True
        finally:
            if d is not None:
                d.cleanup()

        # Reload the config, this may have been changed by compilation / optimization (pruned_heads, gelu_patch, layer_norm_patch)
        with (self.git_path / "config.json").open() as f:
            self.checkpoint_info["config"] = json.load(f)

        return modified

    JS_PATH = "$$JS_PATH$$"
    def create_graphics(self, url_base, model_card_path):
        pruned_heads = self.checkpoint_info["config"].get("pruned_heads")
        ret = {}
        if pruned_heads is not None:
            pruning_info_plotter = PruningInfoBokehPlotter("pruning_info", self.JS_PATH)
            config = self.checkpoint_info["config"]
            layer_count = config["num_hidden_layers"]
            heads_count = config["num_attention_heads"]

            fig, js, html = pruning_info_plotter.run(layer_count=layer_count, pruned_heads=pruned_heads, heads_count=heads_count)
            ret["pruning_info"] = dict(js=js, html=html)

        density_plotter = DensityBokehPlotter("density", self.JS_PATH)

        model = BertForQuestionAnswering.from_pretrained(self.git_path)

        fig, js, html = density_plotter.run(model=model,
                                            dest_path=model_card_path / "images",
                                            url_base=url_base + "/images")
        ret["density_info"] = dict(js=js, html=html)

        from bokeh.io import export_png

        export_png(fig, filename="/tmp/plot.png")

        return ret

    def create_readme(self):
        checkpoint_info = self.checkpoint_info
        model_card_path = "model_card"
        (self.git_path / model_card_path).mkdir(exist_ok=True)

        model_path = f"/{self.model_owner_name}/{self.model_name}/raw/main/{model_card_path}"
        model_card_base_url = f"https://huggingface.co{model_path}"

        graphics = self.create_graphics(url_base=model_path, model_card_path = self.git_path / model_card_path)

        for k, v in graphics.items():
            with (self.git_path / model_card_path / (k + ".js")).open("w") as f:
                f.write(v["js"])
                html = v["html"]
                html = html.replace(self.JS_PATH, f"{model_path}/{k}.js")[1:]
                v["html"] = html

        template_file = Path(__file__).parent / "files" / f"README_MODEL.{self.task}.jinja.md"
        template = jinja2.Template(template_file.open().read())
        template.undefined = jinja2.StrictUndefined

        config = checkpoint_info["config"]
        pruned_heads = sum([len(x) for x in config["pruned_heads"].values()])
        total_heads = config["num_hidden_layers"] * config["num_attention_heads"]

        sparsity_report = dict(linear_density = self.density,
                               total_density = self.total_density,
                               is_ampere=self.is_ampere, pruned_heads=pruned_heads, total_heads=total_heads)
        pytorch_final_file_size = (self.git_path / "pytorch_model.bin").stat().st_size
        packaging_report = dict(pytorch_final_file_size=pytorch_final_file_size, model_name=self.model_name, model_owner_name = self.model_owner_name, version=self.version)

        eval_metrics = checkpoint_info["eval_metrics"]
        eval_metrics_pretty = json.dumps(eval_metrics, indent=4)
        model_base_name =  checkpoint_info["model_args"]["model_name_or_path"]
        model_base_url = "https://huggingface.co/" + model_base_name
        teacher = checkpoint_info["sparse_args"]["distil_teacher_name_or_path"]
        teacher_url = "https://huggingface.co/" + teacher

        if self.task == "squadv1":
            eval_metrics["main_metric"] = eval_metrics["f1"]
            reference = dict(main_metric_value=88.5, main_metric_name="F1")
        elif self.task == "squadv2":
            if self.base_name == "bert-large-uncased-wwm":
                eval_metrics["main_metric"] = eval_metrics["f1"]
                # From teacher https://huggingface.co/madlag/bert-large-uncased-whole-word-masking-finetuned-squadv2
                reference = dict(main_metric_value=85.85, main_metric_name="F1")
            else:
                raise Exception(f"Unknown model type {self.base_name}")
        else:
            raise Exception(f"Unsupport task {self.task}")

        nn_pruning_needed = config.get("layer_norm_type") == "no_norm"
        use_relu = config.get("hidden_act") == "relu"
        original_model_size_mb = self.get_original_model_size_mb()
        original_model_size_params = int(checkpoint_info["stats"]["total"] / checkpoint_info["stats"]["total_sparsity"] * 100)

        ret = template.render(speedup = self.get_speedup(),
                              sparsity = sparsity_report,
                              packaging = packaging_report,
                              eval_metrics = eval_metrics,
                              eval_metrics_pretty = eval_metrics_pretty,
                              graphics=graphics,
                              burl=model_card_base_url,
                              kind=self.kind,
                              reference = reference,
                              model_base_name=model_base_name,
                              model_base_url = model_base_url,
                              teacher = teacher,
                              teacher_url = teacher_url,
                              task=self.task,
                              nn_pruning_needed=nn_pruning_needed,
                              use_relu=use_relu,
                              original_model_size_mb=original_model_size_mb,
                              original_model_size_params=original_model_size_params)

        with (self.git_path / "README.md").open("w") as readme_file:
            readme_file.write(ret)

    def rewrite_report(self, report):
        del report["args"]["output_dir"]
        del report["args"]["device"]
        del report["original_path"]

        f1_ref = self.info_from_files["result"]["f1"]
        exact_ref = self.info_from_files["result"]["exact"]

        f1 = report["result"]["f1"]
        exact = report["result"]["exact"]

        for renaming in ("check_report", "sparsity"), ("result", "precision"):
            report[renaming[1]] = report[renaming[0]]
            del report[renaming[0]]

        assert (abs(f1 - f1_ref) < 1e-5)
        assert (abs(exact - exact_ref) < 1e-5)

        performance = {}
        for suffix, type in ("", "dense"), ("_patched", "pytorch_block_sparse"):
            e = json.loads((self.src_path / f"evaluation_timings_{suffix}.json").open().read())
            performance[type] = e

        for k in performance:
            performance[k]["eval_elapsed_time"] = performance[k]["elapsed_time"]
            del performance[k]["elapsed_time"]

        performance["speedup"] = performance["dense"]["eval_elapsed_time"] / performance["pytorch_block_sparse"][
            "eval_elapsed_time"]

        report["performance"] = performance

        report["sparsity"]["block_size"] = (
        report["config"]["mask_block_rows"], report["config"]["mask_block_cols"])
        return report


    def test(self):
        # Download the model and do some basic stuff
        pass

    def add_files(self):
        files = ["pytorch_model.bin",  "tf_model.h5", "config.json"]
        files.append(self.ORIGINAL_FILES)

        files += ["README.md", "model_card"]
        with cd(self.git_path):
            sh.git("add", *files, _fg=True)

        with cd(self.git_path / "eval"):
            sh.tar("-cvzf", "nbest_predictions.json.tgz", "nbest_predictions.json")
            sh.rm("nbest_predictions.json")

        to_copy = self.get_copy_list()
        for files, dest in to_copy:
            with cd(dest):
                for f in files:
                    if f == "nbest_predictions.json":
                        f += ".tgz"
                    sh.git("add", f, _fg=True)

        assert("checkpoint_dir" not in self.checkpoint_info)
        self.checkpoint_info["checkpoint_path"] = self.checkpoint_path

        with (self.git_path / "model_info.json").open("w") as f:
            f.write(pretty_json(self.checkpoint_info))

        with cd(self.git_path):
            sh.git("add", "model_info.json")


    def commit(self):
        with cd(self.git_path):
            # sh.git("status", _fg=True)
            sh.git("commit", "-m", "Adding model, graphs and metadata.", _fg=True)

    def push(self):
        with cd(self.git_path):
            sh.git("status", _fg=True)
            sh.git("push", _fg=True)

    def run(self, only_name = False):
        self.load_info()
        self.sanity_check()
        self.git_path = self.create_git(only_name=only_name)

        if only_name:
            return
        self.copy_model_files()
        self.create_readme()
        self.add_files()
        self.commit()
        self.push()
