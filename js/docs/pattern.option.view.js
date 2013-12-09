define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-view-attributes'
], function($, _, Backbone, AttributesView) {

  var AttributeView = Backbone.View.extend({
    tagName: 'tr',
    tpl: $('#tpl_attribute').html(),
    render: function() {
      var self = this,
          attrs = '',
          tpl_options = {},
          attrsModel = self.model.get('attributes');
      if (attrsModel) {
        var attrsView = new AttributesView({model: attrsModel});
        attrsView.parentAttr = self.model.get('attribute');
        attrsView.patternOptions = self.patternOptions;
        attrs = $('<div />').append(attrsView.render().$el).html();
      }

      tpl_options.attrs = attrs;

      self.$el.html(_.template(self.tpl, _.extend(tpl_options,self.model.toJSON())));
      return self;
    }
  });

  return AttributeView;
});
