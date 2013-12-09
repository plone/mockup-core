define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-page'
], function($, _, Backbone, Page) {

  var PageView = Backbone.View.extend({
    model: Page,
    template: _.template(
      '<div class="page page-{{ id }}">' +
      ' <h1>{{ title }}</h1>' +
      ' <div>{{ text }}</div>' +
      '</div>',
      false,
      {
        interpolate: /\{\{(.+?)\}\}/g
      }
    ),
    render: function() {
      this.$el = $(this.template({
        id: this.model.get('id'),
        title: this.model.get('title'),
        text: this.model.get('text')
      }));
      return this;
    }
  });

  return PageView;
});
