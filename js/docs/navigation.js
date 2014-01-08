/** @jsx React.DOM */

define([
  'react',
  'backbone'
], function(React, Backbone) {

  var NavView = React.createClass({
    propTypes: {
      position: React.PropTypes.oneOf(['left', 'right'])
    },
    getDefaultProps: function() {
      return {
        position: 'left'
      };
    },
    openPage: function(e) {
      e.preventDefault();
      this.props.app.navigate(
        e.target.attributes.href.value,
        { trigger: true, replace: true }
      );
    },
    render: function() {
      var currentPage = Backbone.history.location.hash.substr(1).split('/')[0],
          NavItems = _.filter(this.props.pages, function(page) {
          return page.id !== this.props.defaultPage && (page.position || 'left') === this.props.position;
        }, this).map(function (page) {
          return <li key={page.id} className={currentPage === page.id ? 'active' : ''}>
                   <a onClick={this.openPage}
                     href={'#' + page.id}
                     alt={page.description}>{page.title}</a></li>;
        }, this);

      return (
        <ul className={"nav navbar-nav navbar-" + this.props.position}>
          {NavItems}
        </ul>
      );
    }
  });

  return NavView;
});
