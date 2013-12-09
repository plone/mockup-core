define([
  'jquery',
  'markdown',
  'backbone'
], function($, markdown, Backbone) {

  var Page = Backbone.Model.extend({
    defaults: {
      title: '',
      text: ''
    },
    initialize: function() {
      var self = this,
          markdown_text = self.get('markdown_text'),
          markdown_url = self.get('markdown_url'),
          options = self.get('options'),
          examples = self.get('examples');

      if (markdown_text) {
        self.set('text', markdown.toHTML(markdown_text));
      } else if (markdown_url) {
        $.get(markdown_url, function(data) {
          self.set('text', markdown.toHTML(data));
        });
      }

    }
  });

  return Page;
});

