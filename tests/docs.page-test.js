define([
  'expect',
  'react',
  'mockup-docs-page'
], function(expect, React, Page) {
  "use strict";

  window.mocha.setup('bdd');

  describe("DocsApp:Page", function () {

    beforeEach(function() {
      this.$root = $('<div/>');
    });

    afterEach(function() {
      React.unmountAndReleaseReactRootNode(this.$root[0]);
      this.$root.remove();
    });

    it("without autotoc", function() {
      var page = new Page({
        id: 'somepage',
        title: 'Some title',
        description: 'Some description',
        text: '<p>Some text</p>',
        autotoc: false
      });
      React.renderComponent(page, this.$root[0]);
      expect($('.page-header h1', this.$root).html()).to.be('Some title');
      expect($('.page-header p', this.$root).html()).to.be('Some description');
      expect($('.page-content > div', this.$root).html().toLowerCase()).to.be('<p>Some text</p>');
    });

    it("autotoc and markdown", function() {
      var page = new Page({
        id: 'somepage',
        title: 'Some title',
        description: 'Some description',
        text: '# something',
        autotoc: true
      });
      React.renderComponent(page, this.$root[0]);
      expect($('.page-content > div', this.$root).hasClass('row')).to.be(true);
      expect($('.mockup-autotoc li a', this.$root).first().html()).to.be('something');
      expect($('.page-content > div > div.col-md-9', this.$root).html().toLowerCase()).to.be(
        '<h1 id="mockup-autotoc_0">something</h1>\n');
    });

    it("patterns", function() {
      var page = new Page({
        id: 'somepage',
        title: 'Some title',
        description: 'Some description',
        autotoc: false,
        patterns: [
          { id: 'somepattern',
            title: 'Some Pattern',
            description: 'Some pattern description.'
          }
        ]
      });
      React.renderComponent(page, this.$root[0]);
      expect($('.mockup-pattern-tile', this.$root).size()).to.be(1);
    });

  });

});
