(function() {

var requirejsOptions = {
  baseUrl: './',
  paths: {
      'expect': 'bower_components/expect/expect',
      'jquery': 'bower_components/jquery/jquery',
      'mockup-docs': 'js/docs',
      'mockup-patterns-base': 'js/pattern',
      'mockup-registry': 'js/registry'
  },
  shim: {
    'expect': { exports: 'window.expect' }
  }
};

if (typeof exports !== "undefined" && typeof module !== "undefined") {
  module.exports = requirejsOptions;
}
if (typeof requirejs !== "undefined" && requirejs.config) {
  requirejs.config(requirejsOptions);
}

}());
