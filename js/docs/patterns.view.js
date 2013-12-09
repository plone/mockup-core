define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-view-pattern'
], function($, _, Backbone, PatternView) {

  var PatternsView = Backbone.View.extend({
    className: 'docs-patterns',
    tpl: $('#tpl_patterns_list').html(),
    children: [],
    render: function() {
      this.$el.html(_.template(this.tpl, {}));
      _.each(this.model.models, function(model) {
        var view = new PatternsItemView({model: model});
        this.children.push(view);
        this.$el.append(view.render().$el);
      }, this);
      return this;
    },
    remove: function() {
      _.each(this.children, function(view) {
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this);
    }
  });

  return PatternsView;
});
