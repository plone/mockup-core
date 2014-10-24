// Tests for Utils

define([
  'expect',
  'jquery',
  'mockup-core-utils'
], function(expect, $, Utils) {
  'use strict';

  window.mocha.setup('bdd');

  describe('Utils', function () {

    it('merge two objects cleanly', function() {
      var OA = {'aa': 1, 'ab': 2, 'ac': {'aca': 31, 'acb': {'acba': 321, 'acbb': 322}}};
      var OB = {'ba': 1, 'bb': 2, 'bc': {'bca': 31, 'bcb': {'bcba': 321, 'bcbb': 322}}, 'aa': 'NEW 1', 'ac': {'acb': {'acbb': 'NEW 322'}}};
      var OC = Utils.deepExtend(Utils.deepExtend({}, OA), OB);

      // Test, if orig objects have not changed
      expect(OA).to.eql({'aa': 1, 'ab': 2, 'ac': {'aca': 31, 'acb': {'acba': 321, 'acbb': 322}}});
      expect(OB).to.eql({'ba': 1, 'bb': 2, 'bc': {'bca': 31, 'bcb': {'bcba': 321, 'bcbb': 322}}, 'aa': 'NEW 1', 'ac': {'acb': {'acbb': 'NEW 322'}}});

      // Test, if deep merging was successful
      expect(OC).to.eql({'aa': 'NEW 1', 'ab': 2, 'ac': {'aca': 31, 'acb': {'acba': 321, 'acbb': 'NEW 322'}}, 'ba': 1, 'bb': 2, 'bc': {'bca': 31, 'bcb': {'bcba': 321, 'bcbb': 322}}});
    });

  });

});
