(function() {
  var fn = function() {
    
    (function(root) {
      function now() {
        return new Date();
      }
    
      var force = false;
    
      if (typeof root._bokeh_onload_callbacks === "undefined" || force === true) {
        root._bokeh_onload_callbacks = [];
        root._bokeh_is_loading = undefined;
      }
    
      
      
    
      var element = document.getElementById("6fe81b46-99df-4de5-a31d-6e9a593375ec");
        if (element == null) {
          console.warn("Bokeh: autoload.js configured with elementid '6fe81b46-99df-4de5-a31d-6e9a593375ec' but no matching script tag was found.")
        }
      
    
      function run_callbacks() {
        try {
          root._bokeh_onload_callbacks.forEach(function(callback) {
            if (callback != null)
              callback();
          });
        } finally {
          delete root._bokeh_onload_callbacks
        }
        console.debug("Bokeh: all callbacks have finished");
      }
    
      function load_libs(css_urls, js_urls, callback) {
        if (css_urls == null) css_urls = [];
        if (js_urls == null) js_urls = [];
    
        root._bokeh_onload_callbacks.push(callback);
        if (root._bokeh_is_loading > 0) {
          console.debug("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.debug("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        root._bokeh_is_loading = css_urls.length + js_urls.length;
    
        function on_load() {
          root._bokeh_is_loading--;
          if (root._bokeh_is_loading === 0) {
            console.debug("Bokeh: all BokehJS libraries/stylesheets loaded");
            run_callbacks()
          }
        }
    
        function on_error() {
          console.error("failed to load " + url);
        }
    
        for (var i = 0; i < css_urls.length; i++) {
          var url = css_urls[i];
          const element = document.createElement("link");
          element.onload = on_load;
          element.onerror = on_error;
          element.rel = "stylesheet";
          element.type = "text/css";
          element.href = url;
          console.debug("Bokeh: injecting link tag for BokehJS stylesheet: ", url);
          document.body.appendChild(element);
        }
    
        const hashes = {"https://cdn.bokeh.org/bokeh/release/bokeh-2.2.3.min.js": "T2yuo9Oe71Cz/I4X9Ac5+gpEa5a8PpJCDlqKYO0CfAuEszu1JrXLl8YugMqYe3sM", "https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.2.3.min.js": "98GDGJ0kOMCUMUePhksaQ/GYgB3+NH9h996V88sh3aOiUNX3N+fLXAtry6xctSZ6", "https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.2.3.min.js": "89bArO+nlbP3sgakeHjCo1JYxYR5wufVgA3IbUvDY+K7w4zyxJqssu7wVnfeKCq8"};
    
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var element = document.createElement('script');
          element.onload = on_load;
          element.onerror = on_error;
          element.async = false;
          element.src = url;
          if (url in hashes) {
            element.crossOrigin = "anonymous";
            element.integrity = "sha384-" + hashes[url];
          }
          console.debug("Bokeh: injecting script tag for BokehJS library: ", url);
          document.head.appendChild(element);
        }
      };
    
      function inject_raw_css(css) {
        const element = document.createElement("style");
        element.appendChild(document.createTextNode(css));
        document.body.appendChild(element);
      }
    
      
      var js_urls = ["https://cdn.bokeh.org/bokeh/release/bokeh-2.2.3.min.js", "https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.2.3.min.js", "https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.2.3.min.js"];
      var css_urls = [];
      
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          (function() {
            var fn = function() {
              Bokeh.safely(function() {
                (function(root) {
                  function embed_document(root) {
                    
                  var docs_json = '{"8957b1da-0f60-4d17-a3ad-f923ee72e850":{"roots":{"references":[{"attributes":{"axis_label":"Fill_rate","formatter":{"id":"8084"},"ticker":{"id":"8048"}},"id":"8047","type":"LinearAxis"},{"attributes":{"data_source":{"id":"8136"},"glyph":{"id":"8137"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8138"},"selection_glyph":null,"view":{"id":"8140"}},"id":"8139","type":"GlyphRenderer"},{"attributes":{"line_alpha":0.25,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8137","type":"Line"},{"attributes":{"data":{"x":[0.25333333333333335],"y":[84.3]},"selected":{"id":"8243"},"selection_policy":{"id":"8244"}},"id":"8212","type":"ColumnDataSource"},{"attributes":{"data":{"x":[0,0.75],"y":[84.6,84.6]},"selected":{"id":"8156"},"selection_policy":{"id":"8157"}},"id":"8136","type":"ColumnDataSource"},{"attributes":{"data_source":{"id":"8523"},"glyph":{"id":"8524"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8525"},"selection_glyph":null,"view":{"id":"8527"}},"id":"8526","type":"GlyphRenderer"},{"attributes":{},"id":"8045","type":"LinearScale"},{"attributes":{"data":{"x":[0,0.75],"y":[82.6,82.6]},"selected":{"id":"8127"},"selection_policy":{"id":"8128"}},"id":"8111","type":"ColumnDataSource"},{"attributes":{"line_alpha":0.125,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8160","type":"Line"},{"attributes":{"data":{"x":[0,0.75],"y":[84.6,84.6]},"selected":{"id":"8245"},"selection_policy":{"id":"8246"}},"id":"8217","type":"ColumnDataSource"},{"attributes":{"line_alpha":0.0625,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8435","type":"Line"},{"attributes":{"source":{"id":"8477"}},"id":"8481","type":"CDSView"},{"attributes":{"data_source":{"id":"8159"},"glyph":{"id":"8160"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8161"},"selection_glyph":null,"view":{"id":"8163"}},"id":"8162","type":"GlyphRenderer"},{"attributes":{},"id":"8052","type":"BasicTicker"},{"attributes":{"line_alpha":0.25,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8218","type":"Line"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8138","type":"Line"},{"attributes":{},"id":"8087","type":"Selection"},{"attributes":{},"id":"8088","type":"UnionRenderers"},{"attributes":{"source":{"id":"8136"}},"id":"8140","type":"CDSView"},{"attributes":{},"id":"8474","type":"Selection"},{"attributes":{"source":{"id":"8212"}},"id":"8216","type":"CDSView"},{"attributes":{"data_source":{"id":"8217"},"glyph":{"id":"8218"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8219"},"selection_glyph":null,"view":{"id":"8221"}},"id":"8220","type":"GlyphRenderer"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8436","type":"Line"},{"attributes":{"data":{"x":[0.34212239583333326,0.2529296875,0.18093532986111116,0.12286603009259256],"y":[83.70860927152319,83.04635761589404,82.68976057055526,81.02903718797758]},"selected":{"id":"8350"},"selection_policy":{"id":"8351"}},"id":"8316","type":"ColumnDataSource"},{"attributes":{"source":{"id":"8434"}},"id":"8438","type":"CDSView"},{"attributes":{"line_color":"#66a61e","line_width":2,"x":{"field":"x"},"y":{"field":"y"}},"id":"8478","type":"Line"},{"attributes":{"data_source":{"id":"8248"},"glyph":{"id":"8249"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8250"},"selection_glyph":null,"view":{"id":"8252"}},"id":"8251","type":"GlyphRenderer"},{"attributes":{"line_alpha":0.0625,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8282","type":"Line"},{"attributes":{},"id":"8154","type":"Selection"},{"attributes":{},"id":"8475","type":"UnionRenderers"},{"attributes":{"fill_color":{"value":"#1f77b4"},"line_color":{"value":"#1f77b4"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8213","type":"Scatter"},{"attributes":{},"id":"8155","type":"UnionRenderers"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8219","type":"Line"},{"attributes":{},"id":"8089","type":"Selection"},{"attributes":{"data_source":{"id":"8111"},"glyph":{"id":"8112"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8113"},"selection_glyph":null,"view":{"id":"8115"}},"id":"8114","type":"GlyphRenderer"},{"attributes":{"source":{"id":"8217"}},"id":"8221","type":"CDSView"},{"attributes":{},"id":"8090","type":"UnionRenderers"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8283","type":"Line"},{"attributes":{},"id":"8243","type":"Selection"},{"attributes":{},"id":"8156","type":"Selection"},{"attributes":{},"id":"8244","type":"UnionRenderers"},{"attributes":{"line_alpha":0.25,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8524","type":"Line"},{"attributes":{},"id":"8157","type":"UnionRenderers"},{"attributes":{"line_alpha":0.1,"line_color":"#66a61e","line_width":2,"x":{"field":"x"},"y":{"field":"y"}},"id":"8479","type":"Line"},{"attributes":{"end":86,"start":79},"id":"8070","type":"Range1d"},{"attributes":{},"id":"8520","type":"UnionRenderers"},{"attributes":{},"id":"8519","type":"Selection"},{"attributes":{"label":{"value":"Original Soft Movement"},"renderers":[{"id":"8480"}]},"id":"8522","type":"LegendItem"},{"attributes":{},"id":"8245","type":"Selection"},{"attributes":{},"id":"8246","type":"UnionRenderers"},{"attributes":{"data_source":{"id":"8094"},"glyph":{"id":"8095"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8096"},"selection_glyph":null,"view":{"id":"8098"}},"id":"8097","type":"GlyphRenderer"},{"attributes":{"line_alpha":0.125,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8095","type":"Line"},{"attributes":{},"id":"8059","type":"ResetTool"},{"attributes":{"axis_label":"Matched","formatter":{"id":"8086"},"ticker":{"id":"8052"}},"id":"8051","type":"LinearAxis"},{"attributes":{"data":{"x":[0,0.75],"y":[83.6,83.6]},"selected":{"id":"8108"},"selection_policy":{"id":"8109"}},"id":"8094","type":"ColumnDataSource"},{"attributes":{"data":{"x":[0,0.75],"y":[83.6,83.6]},"selected":{"id":"8181"},"selection_policy":{"id":"8182"}},"id":"8159","type":"ColumnDataSource"},{"attributes":{"line_alpha":0.0625,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8185","type":"Line"},{"attributes":{},"id":"8055","type":"PanTool"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8096","type":"Line"},{"attributes":{},"id":"8108","type":"Selection"},{"attributes":{"data_source":{"id":"8184"},"glyph":{"id":"8185"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8186"},"selection_glyph":null,"view":{"id":"8188"}},"id":"8187","type":"GlyphRenderer"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8161","type":"Line"},{"attributes":{},"id":"8109","type":"UnionRenderers"},{"attributes":{"source":{"id":"8159"}},"id":"8163","type":"CDSView"},{"attributes":{"data":{"x":[0,0.75],"y":[84.6,84.6]},"selected":{"id":"8567"},"selection_policy":{"id":"8568"}},"id":"8523","type":"ColumnDataSource"},{"attributes":{},"id":"8181","type":"Selection"},{"attributes":{},"id":"8182","type":"UnionRenderers"},{"attributes":{"data":{"x":[0,0.75],"y":[83.6,83.6]},"selected":{"id":"8278"},"selection_policy":{"id":"8279"}},"id":"8248","type":"ColumnDataSource"},{"attributes":{"line_alpha":0.125,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8571","type":"Line"},{"attributes":{"line_alpha":0.0625,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8112","type":"Line"},{"attributes":{"line_alpha":0.125,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8249","type":"Line"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8572","type":"Line"},{"attributes":{},"id":"8278","type":"Selection"},{"attributes":{"data_source":{"id":"8131"},"glyph":{"id":"8132"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8133"},"selection_glyph":null,"view":{"id":"8135"}},"id":"8134","type":"GlyphRenderer"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8525","type":"Line"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8250","type":"Line"},{"attributes":{"source":{"id":"8523"}},"id":"8527","type":"CDSView"},{"attributes":{},"id":"8127","type":"Selection"},{"attributes":{"data_source":{"id":"8570"},"glyph":{"id":"8571"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8572"},"selection_glyph":null,"view":{"id":"8574"}},"id":"8573","type":"GlyphRenderer"},{"attributes":{"source":{"id":"8248"}},"id":"8252","type":"CDSView"},{"attributes":{"data_source":{"id":"8281"},"glyph":{"id":"8282"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8283"},"selection_glyph":null,"view":{"id":"8285"}},"id":"8284","type":"GlyphRenderer"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8113","type":"Line"},{"attributes":{"source":{"id":"8111"}},"id":"8115","type":"CDSView"},{"attributes":{"source":{"id":"8131"}},"id":"8135","type":"CDSView"},{"attributes":{},"id":"8279","type":"UnionRenderers"},{"attributes":{},"id":"8567","type":"Selection"},{"attributes":{},"id":"8128","type":"UnionRenderers"},{"attributes":{},"id":"8568","type":"UnionRenderers"},{"attributes":{"data_source":{"id":"8212"},"glyph":{"id":"8213"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8214"},"selection_glyph":null,"view":{"id":"8216"}},"id":"8215","type":"GlyphRenderer"},{"attributes":{"data":{"x":[0,0.75],"y":[82.6,82.6]},"selected":{"id":"8208"},"selection_policy":{"id":"8209"}},"id":"8184","type":"ColumnDataSource"},{"attributes":{"bottom_units":"screen","fill_alpha":0.5,"fill_color":"lightgrey","left_units":"screen","level":"overlay","line_alpha":1.0,"line_color":"black","line_dash":[4,4],"line_width":2,"right_units":"screen","top_units":"screen"},"id":"8061","type":"BoxAnnotation"},{"attributes":{},"id":"8208","type":"Selection"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8186","type":"Line"},{"attributes":{"source":{"id":"8184"}},"id":"8188","type":"CDSView"},{"attributes":{},"id":"8056","type":"WheelZoomTool"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8214","type":"Scatter"},{"attributes":{"line_alpha":0.1,"line_color":"#e7298a","line_width":2,"x":{"field":"x"},"y":{"field":"y"}},"id":"8318","type":"Line"},{"attributes":{},"id":"8209","type":"UnionRenderers"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8133","type":"Scatter"},{"attributes":{"data":{"x":[0,0.75],"y":[82.6,82.6]},"selected":{"id":"8313"},"selection_policy":{"id":"8314"}},"id":"8281","type":"ColumnDataSource"},{"attributes":{"text":"Mobile Bert (w/o opt)","x":0.25333333333333335,"y":84.3},"id":"8211","type":"Label"},{"attributes":{"source":{"id":"8570"}},"id":"8574","type":"CDSView"},{"attributes":{"data":{"x":[0.5],"y":[84.6]},"selected":{"id":"8154"},"selection_policy":{"id":"8155"}},"id":"8131","type":"ColumnDataSource"},{"attributes":{"data":{"x":[0,0.75],"y":[83.6,83.6]},"selected":{"id":"8616"},"selection_policy":{"id":"8617"}},"id":"8570","type":"ColumnDataSource"},{"attributes":{"source":{"id":"8281"}},"id":"8285","type":"CDSView"},{"attributes":{"line_color":"#e7298a","line_width":2,"x":{"field":"x"},"y":{"field":"y"}},"id":"8317","type":"Line"},{"attributes":{},"id":"8616","type":"Selection"},{"attributes":{"line_alpha":0.0625,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8620","type":"Line"},{"attributes":{},"id":"8313","type":"Selection"},{"attributes":{"data_source":{"id":"8619"},"glyph":{"id":"8620"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8621"},"selection_glyph":null,"view":{"id":"8623"}},"id":"8622","type":"GlyphRenderer"},{"attributes":{},"id":"8314","type":"UnionRenderers"},{"attributes":{},"id":"8617","type":"UnionRenderers"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8074","type":"Scatter"},{"attributes":{"data_source":{"id":"8077"},"glyph":{"id":"8078"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8079"},"selection_glyph":null,"view":{"id":"8081"}},"id":"8080","type":"GlyphRenderer"},{"attributes":{"axis":{"id":"8051"},"dimension":1,"ticker":null},"id":"8054","type":"Grid"},{"attributes":{"label":{"value":"Reference Matched=84.6 BERT-base"},"renderers":[{"id":"8080"},{"id":"8097"},{"id":"8114"},{"id":"8139"},{"id":"8162"},{"id":"8187"},{"id":"8220"},{"id":"8251"},{"id":"8284"},{"id":"8357"},{"id":"8396"},{"id":"8437"},{"id":"8526"},{"id":"8573"},{"id":"8622"}]},"id":"8093","type":"LegendItem"},{"attributes":{"data_source":{"id":"8354"},"glyph":{"id":"8355"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8356"},"selection_glyph":null,"view":{"id":"8358"}},"id":"8357","type":"GlyphRenderer"},{"attributes":{},"id":"8048","type":"BasicTicker"},{"attributes":{"overlay":{"id":"8061"}},"id":"8057","type":"BoxZoomTool"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8079","type":"Line"},{"attributes":{"line_alpha":0.25,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8355","type":"Line"},{"attributes":{},"id":"8351","type":"UnionRenderers"},{"attributes":{"data":{"x":[0,0.75],"y":[82.6,82.6]},"selected":{"id":"8667"},"selection_policy":{"id":"8668"}},"id":"8619","type":"ColumnDataSource"},{"attributes":{"below":[{"id":"8047"}],"center":[{"id":"8050"},{"id":"8054"},{"id":"8071"},{"id":"8092"},{"id":"8130"},{"id":"8211"}],"left":[{"id":"8051"}],"plot_width":800,"renderers":[{"id":"8075"},{"id":"8080"},{"id":"8097"},{"id":"8114"},{"id":"8134"},{"id":"8139"},{"id":"8162"},{"id":"8187"},{"id":"8215"},{"id":"8220"},{"id":"8251"},{"id":"8284"},{"id":"8319"},{"id":"8357"},{"id":"8396"},{"id":"8437"},{"id":"8480"},{"id":"8526"},{"id":"8573"},{"id":"8622"}],"title":{"id":"8037"},"toolbar":{"id":"8062"},"x_range":{"id":"8069"},"x_scale":{"id":"8043"},"y_range":{"id":"8070"},"y_scale":{"id":"8045"}},"id":"8036","subtype":"Figure","type":"Plot"},{"attributes":{"source":{"id":"8316"}},"id":"8320","type":"CDSView"},{"attributes":{},"id":"8350","type":"Selection"},{"attributes":{},"id":"8667","type":"Selection"},{"attributes":{"click_policy":"hide","items":[{"id":"8093"},{"id":"8353"},{"id":"8522"}],"location":"bottom_right"},"id":"8092","type":"Legend"},{"attributes":{"label":{"value":"Hybrid pruning, BERT-base"},"renderers":[{"id":"8319"}]},"id":"8353","type":"LegendItem"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8621","type":"Line"},{"attributes":{"source":{"id":"8619"}},"id":"8623","type":"CDSView"},{"attributes":{},"id":"8668","type":"UnionRenderers"},{"attributes":{"fill_color":{"value":"#1f77b4"},"line_color":{"value":"#1f77b4"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8132","type":"Scatter"},{"attributes":{"data":{"x":[0.750694155218002,0.34656273890574396,0.247365299956507,0.186029553957332,0.131177042042143,0.0947351805073981,0.0602396365698101,0.0402606146574505,0.0284787168842778,0.0214990126796872,0.01685626988373],"y":[84.9210392256749,83.7289862455425,83.331635252165,82.41467142129389,81.7320427916454,81.13092205807429,80.6826286296485,79.9898115129903,79.4294447274579,79.1441670911869,78.7671930718288]},"selected":{"id":"8519"},"selection_policy":{"id":"8520"}},"id":"8477","type":"ColumnDataSource"},{"attributes":{"text":"DistilBERT","x":0.5034571936567231,"y":82.2},"id":"8071","type":"Label"},{"attributes":{"data":{"x":[0,0.75],"y":[84.6,84.6]},"selected":{"id":"8390"},"selection_policy":{"id":"8391"}},"id":"8354","type":"ColumnDataSource"},{"attributes":{"data_source":{"id":"8477"},"glyph":{"id":"8478"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8479"},"selection_glyph":null,"view":{"id":"8481"}},"id":"8480","type":"GlyphRenderer"},{"attributes":{"active_drag":"auto","active_inspect":"auto","active_multi":null,"active_scroll":"auto","active_tap":"auto","tools":[{"id":"8055"},{"id":"8056"},{"id":"8057"},{"id":"8058"},{"id":"8059"},{"id":"8060"}]},"id":"8062","type":"Toolbar"},{"attributes":{"line_alpha":0.125,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8394","type":"Line"},{"attributes":{"data":{"x":[0,0.75],"y":[82.6,82.6]},"selected":{"id":"8474"},"selection_policy":{"id":"8475"}},"id":"8434","type":"ColumnDataSource"},{"attributes":{"source":{"id":"8072"}},"id":"8076","type":"CDSView"},{"attributes":{},"id":"8060","type":"HelpTool"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8356","type":"Line"},{"attributes":{"source":{"id":"8354"}},"id":"8358","type":"CDSView"},{"attributes":{"data_source":{"id":"8393"},"glyph":{"id":"8394"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8395"},"selection_glyph":null,"view":{"id":"8397"}},"id":"8396","type":"GlyphRenderer"},{"attributes":{},"id":"8058","type":"SaveTool"},{"attributes":{"fill_color":{"value":"#1f77b4"},"line_color":{"value":"#1f77b4"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8073","type":"Scatter"},{"attributes":{"data_source":{"id":"8072"},"glyph":{"id":"8073"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8074"},"selection_glyph":null,"view":{"id":"8076"}},"id":"8075","type":"GlyphRenderer"},{"attributes":{},"id":"8390","type":"Selection"},{"attributes":{},"id":"8391","type":"UnionRenderers"},{"attributes":{"line_alpha":0.25,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8078","type":"Line"},{"attributes":{"text":"TinyBERT","x":0.5,"y":84.6},"id":"8130","type":"Label"},{"attributes":{"data_source":{"id":"8316"},"glyph":{"id":"8317"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8318"},"selection_glyph":null,"view":{"id":"8320"}},"id":"8319","type":"GlyphRenderer"},{"attributes":{"data":{"x":[0.5034571936567231],"y":[82.2]},"selected":{"id":"8087"},"selection_policy":{"id":"8088"}},"id":"8072","type":"ColumnDataSource"},{"attributes":{"data":{"x":[0,0.75],"y":[84.6,84.6]},"selected":{"id":"8089"},"selection_policy":{"id":"8090"}},"id":"8077","type":"ColumnDataSource"},{"attributes":{},"id":"8043","type":"LinearScale"},{"attributes":{"end":0.75},"id":"8069","type":"Range1d"},{"attributes":{"source":{"id":"8077"}},"id":"8081","type":"CDSView"},{"attributes":{"data":{"x":[0,0.75],"y":[83.6,83.6]},"selected":{"id":"8431"},"selection_policy":{"id":"8432"}},"id":"8393","type":"ColumnDataSource"},{"attributes":{},"id":"8431","type":"Selection"},{"attributes":{"line_alpha":0.1,"line_color":"red","x":{"field":"x"},"y":{"field":"y"}},"id":"8395","type":"Line"},{"attributes":{"source":{"id":"8393"}},"id":"8397","type":"CDSView"},{"attributes":{"data_source":{"id":"8434"},"glyph":{"id":"8435"},"hover_glyph":null,"muted_glyph":null,"nonselection_glyph":{"id":"8436"},"selection_glyph":null,"view":{"id":"8438"}},"id":"8437","type":"GlyphRenderer"},{"attributes":{"text":"Matched against Fill_rate (BERT-base reference)"},"id":"8037","type":"Title"},{"attributes":{},"id":"8084","type":"BasicTickFormatter"},{"attributes":{"source":{"id":"8094"}},"id":"8098","type":"CDSView"},{"attributes":{},"id":"8432","type":"UnionRenderers"},{"attributes":{"axis":{"id":"8047"},"ticker":null},"id":"8050","type":"Grid"},{"attributes":{},"id":"8086","type":"BasicTickFormatter"}],"root_ids":["8036"]},"title":"Bokeh Application","version":"2.2.3"}}';
                  var render_items = [{"docid":"8957b1da-0f60-4d17-a3ad-f923ee72e850","root_ids":["8036"],"roots":{"8036":"6fe81b46-99df-4de5-a31d-6e9a593375ec"}}];
                  root.Bokeh.embed.embed_items(docs_json, render_items);
                
                  }
                  if (root.Bokeh !== undefined) {
                    embed_document(root);
                  } else {
                    var attempts = 0;
                    var timer = setInterval(function(root) {
                      if (root.Bokeh !== undefined) {
                        clearInterval(timer);
                        embed_document(root);
                      } else {
                        attempts++;
                        if (attempts > 100) {
                          clearInterval(timer);
                          console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
                        }
                      }
                    }, 10, root)
                  }
                })(window);
              });
            };
            if (document.readyState != "loading") fn();
            else document.addEventListener("DOMContentLoaded", fn);
          })();
        },
        function(Bokeh) {
        
        
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i].call(root, root.Bokeh);
        }
        
      }
    
      if (root._bokeh_is_loading === 0) {
        console.debug("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(css_urls, js_urls, function() {
          console.debug("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(window));
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();