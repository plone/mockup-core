(function() {

var basePath = '';
if (typeof mockupCorePath !== "undefined") {
  basePath = mockupCorePath;
}

var requirejsOptions = {

  baseUrl: './',
  paths: {
      'backbone': 'bower_components/backbone/backbone',
      'bootstrap-collapse': 'bower_components/bootstrap/js/collapse',
      'bootstrap-transition': 'bower_components/bootstrap/js/transition',
      'expect': 'bower_components/expect/expect',
      'jquery': 'bower_components/jquery/jquery',
      'markdown': 'bower_components/markdown/lib/markdown',
      'mockup-docs': basePath + 'js/docs/app',
      'mockup-docs-navitem-view': basePath + 'js/docs/navitem.view',
      'mockup-docs-page': basePath + 'js/docs/page',
      'mockup-docs-page-view': basePath + 'js/docs/page.view',
      'mockup-docs-pages': basePath + 'js/docs/pages',
      'mockup-docs-pattern': basePath + 'js/docs/pattern',
      'mockup-docs-pattern-view': basePath + 'js/docs/pattern.view',
      'mockup-docs-patterns': basePath + 'js/docs/patterns',
      'mockup-docs-router': basePath + 'js/docs/router',
      'mockup-patterns-base': basePath + 'js/pattern',
      'mockup-registry': basePath + 'js/registry',
      'sinon': 'bower_components/sinonjs/sinon',
      'underscore': 'bower_components/underscore/underscore'
  },
  shim: {
    'backbone': {exports: 'window.Backbone', deps: ['underscore', 'jquery']},
    'bootstrap-collapse': {exports: 'window.jQuery.fn.collapse.Constructor', deps: ['jquery']},
    'bootstrap-transition': {exports: 'window.jQuery.support.transition', deps: ['jquery']},
    'expect': {exports: 'window.expect'},
    'markdown': {exports: 'window.markdown'},
    'sinon': {exports: 'window.sinon'},
    'underscore': {exports: 'window._'}
  }
};

if (typeof exports !== "undefined" && typeof module !== "undefined") {
  module.exports = requirejsOptions;
}
if (typeof requirejs !== "undefined" && requirejs.config) {
  requirejs.config(requirejsOptions);
}

}());
