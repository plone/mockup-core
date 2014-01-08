(function() {

var basePath = '';
/* istanbul ignore next */
if (typeof mockupCorePath !== "undefined") {
  basePath = mockupCorePath;
}

var requirejsOptions = {

  baseUrl: './',
  paths: {
      'JSXTransformer': 'bower_components/react/JSXTransformer',
      'backbone': 'bower_components/backbone/backbone',
      'bootstrap-collapse': 'bower_components/bootstrap/js/collapse',
      'bootstrap-transition': 'bower_components/bootstrap/js/transition',
      'expect': 'node_modules/expect.js/expect',
      'jquery': 'bower_components/jquery/jquery',
      'marked': 'bower_components/marked/lib/marked',
      'mockup-docs': basePath + 'js/docs/app',
      'mockup-docs-page': basePath + 'js/docs/page',
      'mockup-docs-pattern': basePath + 'js/docs/pattern',
      'mockup-docs-view': basePath + 'js/docs/view',
      'mockup-docs-navigation': basePath + 'js/docs/navigation',
      'mockup-patterns-base': basePath + 'js/pattern',
      'mockup-registry': basePath + 'js/registry',
      'react': 'bower_components/react/react',
      'jsx': 'bower_components/require-jsx/jsx',
      'sinon': 'node_modules/sinon/pkg/sinon',
      'underscore': 'bower_components/lodash/dist/lodash.underscore'
  },
  shim: {
    'JSXTransformer': { exports: 'window.JSXTransformer' },
    'backbone': {exports: 'window.Backbone', deps: ['underscore', 'jquery']},
    'bootstrap-collapse': {exports: 'window.jQuery.fn.collapse.Constructor', deps: ['jquery']},
    'bootstrap-transition': {exports: 'window.jQuery.support.transition', deps: ['jquery']},
    'expect': {exports: 'window.expect'},
    'sinon': {exports: 'window.sinon'},
    'underscore': {exports: 'window._'}
  }
};

/* istanbul ignore next */
if (typeof exports !== "undefined" && typeof module !== "undefined") {
  module.exports = requirejsOptions;
}
/* istanbul ignore next */
if (typeof requirejs !== "undefined" && requirejs.config) {
  requirejs.config(requirejsOptions);
}

}());
