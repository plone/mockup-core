define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var templateOptions = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
  };

  var PageView = Backbone.View.extend({
    className: 'page',

    template: _.template(
      '<div class="page-header">' +
      ' <div class="container">' +
      '  <h1>{{= title }}</h1>' +
      '  <p>{{= description }}</p>' +
      ' </div>' +
      '</div>' +
      '<div class="container">' +
      ' <div class="page-content">' +
      '  {{= text }}' +
      ' </div>' +
      '</div>', false, templateOptions
    ),
    templateAutoTOC: _.template(
      '<div class="row">' +
      ' <div class="col-md-3">' +
      '  <div class="mockup-autotoc hidden-print" role="complementary">' +
      '   <ul class="nav">' +
      '    {{ _.each(toc, function(i) { }}' +
      '    <li>' +
      '     <a href="#{{= i.id }}">{{= i.title }}</a>' +
      '     {{ if (i.submenu.length !== 0) { }}' +
      '     <ul class="nav">' +
      '      {{ _.each(i.submenu, function(j) { }}' +
      '      <li>' +
      '       <a href="#{{= j.id }}">{{= j.title }}</a>' +
      '      </li>' +
      '      {{ }); }}' +
      '     </ul>' +
      '     {{ } }}' +
      '    </li>' +
      '    {{ }); }}' +
      '   </ul>' +
      '  </div>' +
      ' </div>' +
      ' <div class="col-md-9">' +
      '  {{= text }}' +
      ' </div>' +
      '</div>', false, templateOptions
    ),

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },

    render: function() {
      var templateOptions = this.model.toJSON(),
          toc = [],
          tocItemID,
          tocItemParent;

      if (this.model.get('autotoc') === true) {
        templateOptions['text'] = $('<div>' + templateOptions['text']+'</div>');
        templateOptions['text'].find('h1,h2').each(function() {
            tocItemID = _.uniqueId('mockup-autotoc_');
            $(this).attr('id', tocItemID);
            if ($.nodeName(this, 'h1')) { 
              tocItemParent = {
                id: tocItemID,
                title: $(this).text(),
                submenu: []
              };
              toc.push(tocItemParent);

            } else {
              tocItemParent.submenu.push({
                id: tocItemID,
                title: $(this).text()
              });
            }
          });

        templateOptions['text'] = templateOptions['text'].html();
        templateOptions['text'] = this.templateAutoTOC($.extend(
          {}, templateOptions, { toc: toc } ));
      }

      this.$el.html(this.template(templateOptions));
      $('body').attr('class', 'page-' + this.model.get('id'));

      if (this.model.get('autotoc') === true) {
        $('.mockup-autotoc a', this.$el).on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          $('.mockup-autotoc li.active').removeClass('active');
          $(this).parent().addClass('active');
          $(this).parent().parents('li').first().addClass('active');
          $(window).scrollTop(
            $($(this).attr('href')).offset().top -
            $('.mockup-header').outerHeight(true)
          );
        });
      }

      return this;
    }
  });

  return PageView;
});
