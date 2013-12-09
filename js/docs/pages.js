define([
  'backbone',
  'mockup-docs-page'
], function(Backbone, Page) {

  var Pages = Backbone.Collection.extend({
    model: Page,
    comparater: function(model) {
      return model.get('title');
    }
  });

  return Pages;
});
