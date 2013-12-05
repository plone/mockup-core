(function() {

var requirejsOptions = {
  baseUrl: './',
  paths: {
      'chai': 'bower_components/chai/chai',
      'jquery': 'bower_components/jquery/jquery',
      'mockup-docs': 'js/docs',
      'mockup-patterns-base': 'js/pattern',
      'mockup-registry': 'js/registry'
  },
  shim: {
  }
};

if (typeof exports !== "undefined" && typeof module !== "undefined") {
  module.exports = requirejsOptions;
}
if (typeof requirejs !== "undefined" && requirejs.config) {
  requirejs.config(requirejsOptions);
}

}());
