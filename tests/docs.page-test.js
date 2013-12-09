// tests for Base
//
// @author Rok Garbas
// @version 1.0
// @licstart  The following is the entire license notice for the JavaScript
//            code in this page.
//
// Copyright (C) 2010 Plone Foundation
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation; either version 2 of the License.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
// more details.
//
// You should have received a copy of the GNU General Public License along with
// this program; if not, write to the Free Software Foundation, Inc., 51
// Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//
// @licend  The above is the entire license notice for the JavaScript code in
//          this page.
//

define([
  'expect',
  'sinon',
  'mockup-docs-page'
], function(expect, sinon, Page) {
  "use strict";

  window.mocha.setup('bdd');

  describe("Docs:Model:Page", function () {

    beforeEach(function() {
      this.server = sinon.fakeServer.create();
      this.server.autoRespond = true;
      this.server.autoRespondAfter = 0;
    });

    afterEach(function() {
      this.server.restore();
    });

    it("has default values", function() {
      var page = new Page();
      expect(page.get('title')).to.equal('');
      expect(page.get('text')).to.equal('');
    });

    it("will render markdown content", function() {
      var page = new Page({markdown_text: '# Title'});
      expect(page.get('text')).to.equal('<h1>Title</h1>');
    });

    it("will fetch markdown document", function(done) {
      this.server.respondWith("GET", /some-document/, function (xhr, id) {
        xhr.respond(200, { "Content-Type": "plain/text" }, '# Title');
      });

      var page = new Page({markdown_url: 'some-document'});
      page.on('change:text', function(e, content) {
        expect(content).to.equal('<h1>Title</h1>');
        done();
      });
    });

  });

});
