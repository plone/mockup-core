define([
  'backbone',
  'mockup-docs-model-attribute'
], function(Backbone, Attribute) {

  var Attributes = Backbone.Collection.extend({
    model: Attribute
  });

  return Attributes;
});
