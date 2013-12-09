define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-page-view',
  'mockup-docs-pattern-view'
], function($, _, Backbone, PageView, PatternView) {

  var Router = Backbone.Router.extend({
    routes: {
      'pattern': 'defaultPattern',
      'pattern/(:id)': 'pattern',
      '': 'defaultPage',
      '(:id)': 'page'
    },

    initialize: function(options) {
      if (options.app) {
        this.app = options.app;
      }
    },

    defaultPage: function() {
      this.page(this.app.defaultPage);
    },

    page: function(id) {
      this.show(new PageView({
        model: this.app.pages.get(id),
      }));
    },

    defaultPattern: function() {
      this.pattern(this.app.patterns.first());
    },

    pattern: function(id) {
      this.show(new PatternView({
        model: this.app.patterns.get(id),
      }));
    },

    show: function(view) {
      if (this.currentView !== undefined) {
        this.currentView.remove();
        delete this.currentView;
      }
      this.currentView = view;
      this.app.$el.html(this.currentView.render().$el);
    }
  });

  return Router;
});
