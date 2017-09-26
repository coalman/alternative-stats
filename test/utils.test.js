import utils from 'alternative-stats/utils';

describe('utils.js', function () {
  describe('iterToLookup', function () {
    it('should return an object', function () {
      let actual = utils.iterToLookup([], (i) => i);

      assert.isObject(actual, 'lookup is an object');
    });

    it('should create a lookup', function () {
      let data = [1, 2, 3];
      let func = (i) => i + 1;

      let actual = utils.iterToLookup(data, func);

      assert.strictEqual(actual[2], 1, 'key 2 should return value 1');
      assert.strictEqual(actual[3], 2, 'key 3 should return value 2');
      assert.strictEqual(actual[4], 3, 'key 4 should return value 3');
    });
  });
});
