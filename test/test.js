// http://www.chaijs.com/guide/styles
const assert = require('chai').assert;

describe('Name Generator', function() {
  describe('Generating 5 random names', function() {
    var names = [];

    it('should list 5 random names', function() {
      assert.lengthOf(names, 5);
    });
    it('each one should be string', function() {
      for ( let value of names ){
        assert.typeOf(value, 'string');
      }
    });
  });
});
