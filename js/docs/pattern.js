define([
  'jquery',
  'mockup-docs-page'
], function($, Page) {

  var Pattern = Page.extend({
    initialize: function() {
      Page.prototype.initialize.apply(this, arguments);
    }
  });

  return Pattern;
});

