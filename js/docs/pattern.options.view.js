define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-view-attribute',
], function($, _, Backbone, AttributeView) {

  var AttributesView = Backbone.View.extend({
    tagName: 'table',
    className: 'table',
    tpl: $('#tpl_attributes').html(),
    render: function() {
      var self = this;
      this.$el.html(_.template(this.tpl, {}));
      _.each(this.model.models, function(model) {
        if (self.patternOptions) {
          var defaultValue;
          var attr = model.get('attribute');

          // If the doc item has a defaultValue use it, otherwise, try to grab it off of the pattern
          if (!model.get('defaultValue')) {
            if (self.parentAttr) {
              try {
                defaultValue = self.patternOptions[self.parentAttr][attr];
              } catch (e) {

              }
            } else {
              try {
                defaultValue = self.patternOptions[attr];
              } catch (e) {

              }
            }
            if (defaultValue !== undefined) {
              if ((model.get('type') === 'String') && (defaultValue !== null)) {
                defaultValue = "'"+defaultValue+"'";
              }
              if (defaultValue) {
                model.set('defaultValue', '<code>'+_.escape(defaultValue)+'</code>');
              } else {
                model.set('defaultValue', '<code>'+defaultValue+'</code>');
              }
            }
          }
        }
        var view = new AttributeView({model: model});
        view.patternOptions = self.patternOptions;
        this.$el.find('> tbody').append(view.render().$el);
      }, this);
      return this;
    }
  });

  return AttributesView;
});
