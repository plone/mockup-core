define([
  'jquery',
  'underscore',
  'markdown',
  'backbone',
  'mockup-registry'
], function($, _, markdown, Backbone, Registry) {

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
    templatePatterns: _.template(
      '<div class="row mockup-patterns">' +
      ' {{ _.each(patterns, function(i) { }}' +
      ' <div class="col-xs-12 col-sm-4 col-md-3">' +
      '   <a class="mockup-pattern-tile" href="{{= i.url }}">' +
      '    <h2>{{= i.title }}</h2>' +
      '    <p>{{= i.description }}</p>' +
      '   </a>' +
      ' </div>' +
      ' {{ }); }}' +
      '</div>', false, templateOptions
    ),
    templatePattern: _.template(
      '<div>' +
      ' <h2>Documentation</h2>' +
      ' <div class="mockup-pattern-documentation">' +
      '  {{= documentation }}' +
      ' </div>' +
      ' <h2>Configuration</h2>' +
      ' <div class="table-responsive mockup-pattern-configuration">' +
      '  <table class="table table-stripped table-condensed">' +
      '   <thead>' +
      '    <tr>' +
      '     <th>Option</th>' +
      '     <th>Type</th>' +
      '     <th>Default</th>' +
      '     <th>Description</th>' +
      '    </tr>' +
      '   </thead>' +
      '   <tbody>' +
      '   {{ _.each(options, function(option, name) { }}' +
      '   <tr>' +
      '    <td>{{= name }}</td>' +
      '    <td> </td>' +
      '    <td>{{= option.defaultValue }}</td>' +
      '    <td>{{= option.description }}</td>' +
      '   </tr>' +
      '   {{ }); }}' +
      '   </tbody>' +
      '  </table>' +
      ' </div>' +
      ' <h2>License</h2>' +
      ' <div class="mockup-pattern-license">' +
      '  {{= license }}' +
      ' </div>' +
      '</div>', false, templateOptions
    ),
    templateExample: _.template(
      '<div class="mockup-pattern-example">' +
      ' {{= html }}' +
      ' <p><pre>{{= _.escape(html) }}</pre><p>' +
      '</div>', false, templateOptions
    ),

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },

    render: function() {
      var self = this,
          templateOptions = this.model.toJSON(),
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

      if (this.model.get('patterns') !== undefined) {
        templateOptions['text'] += this.templatePatterns(templateOptions);
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

      if (this.model.get('patterns') !== undefined) {
        $('.mockup-pattern-tile', this.$el).on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          if ($('.mockup-pattern-tile.active').get(0) === this) {
            return;
          }

          $('.mockup-pattern-tile.active').removeClass('active').removeAttr('style');
          $('.mockup-pattern').remove();

          $(this).toggleClass('active');

          if ($(this).hasClass('active')) {
            var $pattern = $('<div class="mockup-pattern"></div>');
            $(this).animate({
              'padding-bottom': "+=1em"
            }, 200, function() {
              var $item = $(this).parent().next();
              if ($item.size() === 0) {
                $(this).parent().after($pattern);
              } else {
                while ($item.size() !== 0) {
                  if ($item.find('.mockup-pattern-tile').offset().top !== $(this).offset().top) {
                    break;
                  }
                  $item = $item.next();
                }
                $item.before($pattern);
              }

              require([
                'text!' + $(this).attr('href'),
                $(this).attr('href')
              ], function (patternString) {
                var regDoc = /\/\*[\s\S]*?\*\//gm,
                    doc = regDoc.exec(patternString)[0],
                    option = /(.*) (.*): (.*) \((.*)\)$/,
                    section = /^Options:|^Documentation:|^License:|^Example:/,
                    currentOption,
                    currentExample,
                    currentSection,
                    examples = {},
                    pattern = {};

                doc = doc.substring(1, doc.length - 1);
                $.each(doc.split('\n'), function(lineNumber, line) {
                  line = line.substring(line.indexOf('*') + 2)

                  if (section.exec(line) !== null) {
                    currentSection = section.exec(line)[0].toLowerCase();
                    currentSection = currentSection.substring(0, currentSection.length - 1)
                    if (currentSection === 'example') {
                      currentExample = line.substring(8).trim();
                    }
                  } else if (currentSection) {
                    if (currentSection === 'options') {
                      currentOption = option.exec(line);
                      if (currentOption) {
                        if (!pattern.options) {
                          pattern.options = {};
                        }
                        pattern.options[currentOption[2]] = {
                          description: currentOption[3],
                          defaultValue: currentOption[4]
                        };
                      }
                    } else if (currentExample && currentSection === 'example') {
                      if (!examples[currentExample]) {
                        examples[currentExample] = '';
                      }
                      examples[currentExample] += line + '\n';
                    } else {
                      if (!pattern[currentSection]) {
                        pattern[currentSection] = '';
                      }
                      pattern[currentSection] += line + '\n';
                    }
                  }
                });
                $.each(pattern, function(i, value) {
                  if (typeof value === 'string') {
                    pattern[i] = '';
                    var lines = value.split('\n'),
                        firstLineSpaces = lines[0].length - lines[0].trimLeft().length;
                    $.each(value.split('\n'), function(j, line) {
                      pattern[i] += line.substring(firstLineSpaces) + '\n';
                    });

                    pattern[i] = markdown.toHTML(pattern[i]);

                    $.each(examples, function(name, example) {
                      example = self.templateExample({ html: example });
                      pattern[i] = pattern[i].replace('{{ ' + name + ' }}', example);
                    });

                  }
                });

                $pattern.append(self.templatePattern(pattern));
                Registry.scan($pattern);
              });
            });
          }
        });
      }

      return this;
    }
  });

  return PageView;
});
