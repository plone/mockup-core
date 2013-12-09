define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone) {

  var PatternView = Backbone.View.extend({
    initialize: function() {
      this.exampleClass = 'example-' + this.model.get('id');
      this.$examples = $('script.'+this.exampleClass);
    },
    renderExamples: function() {
      var tpl = $('#tpl_example').html();
      var html = '';
      var examples = this.buildExamples();
      _.each(examples, function(example) {
        html += _.template(tpl, example);
      }, this);
      return html;
    },
    buildExamples: function() {
      var self = this,
          built = [];
      self.$examples.each(function() {
        var obj = {
          title: ''
        };
        obj.html = $(this).html();
        obj.pre = _.escape(obj.html);
        if ($(this).data().title !== undefined) {
          obj.title = $(this).data().title;
        }
        built.push(obj);
      });
      return built;
    },
    render: function() {
      var self = this;
      var tpl = $('#tpl_pattern').html();
      var patterns = ["mockup-patterns-" + self.model.get('id'), "mockup-fakeserver"];
      var extras = self.model.get('extras');
      if(extras){
        for(var i=0; i<extras.length; i=i+1){
          patterns.push("mockup-patterns-" + extras[i]);
        }
      }
      require(patterns, function (Pattern) {
        self.$el.html(_.template(tpl, _.extend({
          examples: self.renderExamples()
        }, self.model.toJSON())));

        if (self.model.get('attributes')) {
          var attrsView = new AttributesView({model: self.model.get('attributes')});
          attrsView.patternOptions = new Pattern($('<div />'), {__returnDefaults: true}).options;
          $('.docs-attributes', self.$el).append(attrsView.render().$el);
        }
        registry.scan(self.$el);
      });
      return this;
    }
  });

  return PatternView;
});
