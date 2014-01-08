/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'jsx!mockup-docs-navigation',
  'jsx!mockup-docs-page',
  'bootstrap-collapse',
  'bootstrap-transition'
], function(_, React, Nav, Page) {

  var AppView = React.createClass({
    propTypes: {
      pages: React.PropTypes.array
    },
    getDefaultProps: function() {
      var self = this;
      return {
        defaultPage: 'index',
        pages: []
      };
    },
    getInitialState: function() {
      return {
        page: 'index'
      };
    },
    render: function() {
      var pageID = this.state.page.split('/')[0],
          NavLeft = this.transferPropsTo(<Nav />),
          NavRight = this.transferPropsTo(<Nav position="right" />),
          CurrentPage = Page(_.findWhere(this.props.pages, {id: pageID}));
      return (
        <div className={"wrapper page-" + pageID}>
          <a href="#content" className="sr-only">
            Skip to main content'
          </a>
          <header className="navbar navbar-inverse navbar-fixed-top mockup-header">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle"
                  data-toggle="collapse" data-target="#navigation">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Mockup</a>
              </div>
              <nav className="collapse navbar-collapse" id="navigation">
                {NavLeft}
                {NavRight}
              </nav>
            </div>
          </header>
          {CurrentPage}
          <footer className="navbar navbar-inverse mockup-footer">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6 mockup-credits">
                  <p>Build by <a href="http://plone.org">Plone</a> community</p>
                  <p>Code and documentation licensed under <a href="http://www.opensource.org/licenses/mit-license.php">MIT</a>.</p>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <ul className="mockup-links">
                    <li><a href="https://github.com/plone/mockup/issues">Issues</a></li>
                    <li><a href="https://github.com/plone/mockup/releases">Releases</a></li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 mockup-github">
                  <iframe src="http://ghbtns.com/github-btn.html?user=plone&amp;repo=mockup&amp;type=watch&amp;count=true"
                      className="github-btn" width="100" height="20" title="Star on GitHub" />
                  <iframe src="http://ghbtns.com/github-btn.html?user=plone&amp;repo=mockup&amp;type=fork&amp;count=true"
                      className="github-btn" width="102" height="20" title="Fork on GitHub" />
                  <iframe src="http://ghbtns.com/github-btn.html?user=plone&amp;type=follow&amp;count=true"
                      className="github-btn" width="130" height="20" title="Follow on GitHub" />
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  });

  return AppView;
});
