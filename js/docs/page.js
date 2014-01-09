/** @jsx React.DOM */

define([
  'jquery',
  'underscore',
  'backbone',
  'marked',
  'react',
  'jsx!mockup-docs-pattern'
], function($, _, Backbone, marked, React, Pattern) {

  var Page = React.createClass({
    getDefaultProps: function() {
      return {
        title: '',
        description: '',
        autotoc: true,
        text: ''
      };
    },
    componentDidUpdate: function() {
      var currentPage = Backbone.history.location.hash.substr(1).split('/');
      if (currentPage.length > 1) {
        $(window).scrollTop($('#' + currentPage[1]).offset().top - $('.mockup-header').outerHeight(true));
      }
    },
    render: function() {
      var page = this.props, PageText, PageContent, PatternID;

      if (typeof page.text === 'string' && page.text.trim().substr(0, 1) !== '<') {
        PageText = marked(page.text)
      } else {
        PageText = page.text;
      }

      if (page.autotoc) {
        var autotoc = [], autotocID,
            $autotoc = $('<div>' + PageText + '</div>');
        
        $autotoc.find('h1,h2').each(function(i) {
          autotocID = 'mockup-autotoc_' + i;
          $(this).attr('id', autotocID);
          if ($.nodeName(this, 'h1')) { 
            autotoc.push({
              id: autotocID,
              title: $(this).text(),
              submenu: []
            });
          } else {
            autotoc[autotoc.length - 1].submenu.push({
              id: autotocID,
              title: $(this).text()
            });
          }
        });
        PageContent =
          <div className="row">
            <div className="col-md-3">
              <div className="mockup-autotoc hidden-print" role="complementary">
                <ul className="nav">
                  {autotoc.map(function(item) {
                    return (
                      <li key={page.id + '/' + item.id}>
                        <a href={'#' + page.id + '/' + item.id}>{item.title}</a>
                        {item.submenu ?
                          <ul className="nav">
                            {item.submenu.map(function(subitem) {
                              return <li key={page.id + '/' + subitem.id}><a href={'#' + page.id + '/' + subitem.id}>{subitem.title}</a></li>})}
                          </ul> : undefined}
                      </li>)
                    })}
                </ul>
              </div>
            </div>
            <div className="col-md-9"
                 dangerouslySetInnerHTML={{__html: $autotoc.html()}} />
          </div>
      } else if (page.patterns) {
        if (Backbone.history.location.hash.substr(1).split('/').length > 1) {
          PatternID = Backbone.history.location.hash.substr(1).split('/')[1];
        }

        PageContent =
          <div className="row mockup-patterns">
            {page.patterns.map(function(pattern) { return (
            <div>
              <div key={pattern.id} className="col-xs-12 col-sm-4 col-md-3">
                <a className={PatternID === pattern.id ? "mockup-pattern-tile active" : "mockup-pattern-tile"}
                   href={'#' + page.id + '/' + pattern.id}>
                  <h2>{pattern.title}</h2>
                  <p>{pattern.description}</p>
                </a>
              </div>
              {PatternID === pattern.id ? <Pattern url={pattern.url} /> : ''}
            </div>
            )})}
         </div>

      } else if (typeof PageText === 'string') {
        PageContent = <div dangerouslySetInnerHTML={{__html: PageText}} />
      }

      return  (
        <div className="mockup-content" id="content">
          <div className="page-header">
           <div className="container">
            <h1>{page.title}</h1>
            <p>{page.description}</p>
           </div>
          </div>
          <div className="container">
            <div key={page.id} className="page-content">
              {PageContent}
            </div>
          </div>
        </div>
      );
    }
  });

  return Page;
});
