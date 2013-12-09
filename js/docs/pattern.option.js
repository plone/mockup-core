define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-collection-attributes'
], function($, _, Backbone, Attributes) {

  var Attribute = Backbone.Model.extend({
    defaults: {
      attribute: '',
      type: '',
      description: '',
      defaultValue: ''
    },
    initialize: function() {
      if (this.get('attributes')) {
        var collection = new Attributes();
        collection.add(this.get('attributes'));
        this.set('attributes', collection);
      }
    }
  });

  return Attribute;
});
