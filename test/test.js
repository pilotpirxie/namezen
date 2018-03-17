// http://www.chaijs.com/guide/styles
const assert = require('chai').assert;
const Namezen = require('../lib/namezen');
const nmz = new Namezen();

describe('Name Generator', function() {
  describe('Generating 5 random names', function() {
    var names = nmz.generate('chips,potato,crispy,fast,food,burger,meal', 5, 12, 5);

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
