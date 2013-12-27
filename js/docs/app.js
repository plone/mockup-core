define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-router',
  'mockup-docs-pages',
  'mockup-docs-navitem-view',
  'bootstrap-collapse',
  'bootstrap-transition'
], function($, _, Backbone, Router, Pages, NavItemView) {

  var App = Backbone.View.extend({
    el: 'body',
    defaultPage: 'index',

    initialize: function(options) {
      var self = this;

      self.$content = options.$content || $('#content');
      self.$navigation = options.$navigation || $('#navigation');
      self.$navigationRight = options.$navigationRight || $('#navigation-right');

      self.navigationItems = {};

      self.router = new Router({app: self});
      self.pages = new Pages();

      self.listenTo(self.pages, "add", self.addNavItem);
      self.listenTo(self.pages, "open", self.openPage);

      _.each(options.pages || [], function(page) {
        self.pages.add(page);
      });

      Backbone.history.start({ pushState: false });
    },

    addNavItem: function(page) {
      var pageId = page.get('id');
      if (pageId !== this.defaultPage) {
        this.navigationItems[pageId] = new NavItemView({ model: page });
        this.navigationItems[pageId].render();
        if (page.get('navigation') === 'right') {
          this.$navigationRight.append(this.navigationItems[pageId].$el);
        } else {
          this.$navigation.append(this.navigationItems[pageId].$el);
        }
      }
    },

    openPage: function(page) {
      this.router.navigate('#' + page.get('id'), {trigger: true});
    }

  });

  return App;
});
