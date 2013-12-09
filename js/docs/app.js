define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-router',
  'mockup-docs-pages',
  'mockup-docs-patterns'
], function($, _, Backbone, Router, Pages, Patterns) {

  var App = function(options) { this.initialize(options || {}); };
  App.prototype = {
    defaultPage: 'index',

    initialize: function(options) {
      this.$el = options.$el || $('#content');

      this.patterns = new Patterns();
      this.pages = new Pages();
      this.router = new Router({app: this});

      //var path = window.location.pathname.split('/'),
      //    this.rootUrl = '';
      //_.each(path, function (pathEntry, index) {
      //  if (index < path.length - 1) {
      //    rootUrl += pathEntry + '/';
      //  }
      //});
      //rootUrl += 'index.html';

      return this;
    },

    start: function() {
      Backbone.history.start({
        pushState: false,
    //    root: rootUrl
      });
    },

    addPage: function(page) {
      this.pages.add(page);
    },

    addPattern: function(pattern) {
      this.pages.add(pattern);
    }

  };

  return App;
});
