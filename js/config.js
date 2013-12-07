(function() {

var requirejsOptions = {
  baseUrl: './',
  paths: {
      'backbone': 'bower_components/backbone/backbone',
      'expect': 'bower_components/expect/expect',
      'jquery': 'bower_components/jquery/jquery',
      'mockup-docs': 'js/docs',
      'mockup-patterns-base': 'js/pattern',
      'mockup-registry': 'js/registry',
      'underscore': 'bower_components/underscore/underscore'
  },
  shim: {
    'expect': { exports: 'window.expect' },
    'underscore': { exports: 'window._' },
    'backbone': {
      exports: 'window.Backbone',
      deps: ['underscore', 'jquery']
    }
  }
};

if (typeof exports !== "undefined" && typeof module !== "undefined") {
  module.exports = requirejsOptions;
}
if (typeof requirejs !== "undefined" && requirejs.config) {
  requirejs.config(requirejsOptions);
}

}());
