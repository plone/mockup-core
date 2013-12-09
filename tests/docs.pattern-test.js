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
  'mockup-docs-pattern'
], function(expect, sinon, Pattern) {
  "use strict";

  window.mocha.setup('bdd');

  describe("Docs:Model:Pattern", function () {

    beforeEach(function() {
      this.server = sinon.fakeServer.create();
      this.server.autoRespond = true;
      this.server.autoRespondAfter = 0;
    });

    afterEach(function() {
      this.server.restore();
    });

    it("has default values", function() {
      var pattern = new Pattern();
      expect(pattern.get('title')).to.equal('');
      expect(pattern.get('text')).to.equal('');
    });

  });

});
