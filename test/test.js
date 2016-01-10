var Clima = require('../lib/node-clima');
var assert = require('assert');

d = new Clima({
  format: 'json',
  units: 'Celsius',
  apikey: ''
});

module.exports = {
  'Invalid options passed to constructor.': function(test) {
    test.expect(1);
    test.throws(function(){
      c = new Clima();
    }, Error, 'Invalid options passed to constructor, did not throw error.');
    test.done();
  },
  'Format is required': function(test) {
    test.expect(1);
    test.throws(function(){
      c = new Clima({

      });
    }, Error, 'Format is required, did not throw error');
    test.done();
  },
  'Invalid format': function(test) {
    test.expect(1);
    test.throws(function() {
      var c = new Clima({
        format: 'asd'
      })
    }, Error, 'Invalid format, did not throw error.');
    test.done();
  },
  'Invalid apikey': function(test) {
    test.expect(1);
    test.throws(function() {
      var c = new Clima({
        format: 'json',
        apikey: 2323
      })
    }, Error, 'Invalid apikey, did not throw error.');
    test.done();
  },
  'Invalid units': function(test) {
    test.expect(1);
    test.throws(function() {
      var c = new Clima({
        format: 'json',
        units: 12313
      })
    }, Error, 'Invalid units, did not throw error.');
    test.done();
  },
  'Invalid language': function(test) {
    test.expect(1);
    test.throws(function() {
      var c = new Clima({
        format: 'json',
        language: 133
      })
    }, Error, 'Invalid language, did not throw error.');
    test.done();
  },
  // Invalid byCityName
  'Invalid currentByCityName.': function(test) {
    test.expect(1);
    test.throws(function() {
      d.currentByCityName({
        cityName: [232],
        callback: function(err, data) {
          if (err) throw new Error(err);
        }
      });
    },
    Error, 'Incorrect cityName to currentByCityName did not throw error.');
    test.done();
  },
  // Invalid byCityId
  'Invalid currentByCityId.': function(test) {
    test.expect(1);
    test.throws(function() {
      d.currentByCityId({
        cityId: [232],
        callback: function(err, data) {
          if (err) throw new Error(err);
        }
      });
    },
    Error, 'Incorrect cityId to currentByCityId did not throw error.');
    test.done();
  },
  // Invalid byCoordinates
  'Invalid currentByCoordinates': function(test) {
    test.expect(1);
    test.throws(function() {
      d.currentByCoordinates({
        coord: 'asd',
        callback: function(err, data) {
          if (err) throw new Error(err)
        }
      });
    },
    Error, 'Incorrect zip to currentByCoordinates did not throw error.');
    test.done();
  },
  // Invalid byZipCode
  'Invalid currentByZipCode': function(test) {
    test.expect(1);
    test.throws(function() {
      d.currentByZipCode({
        zip: [223],
        callback: function(err, data) {
          if (err) throw new Error(err)
        }
      });
    },
    Error, 'Incorrect zip to currentByZipCode did not throw error.');
    test.done();
  },
  // Correctly implimented
  'Valid methods' : function(test) {
    test.expect(1);
    test.doesNotThrow(function(){
      d.currentByCityName({
        cityName: 'Puertollano',
        callback: function(err, data) {
          if (err) throw new Error(err);
          assert.ok(data, 'No data returned from byCityName.');
        }
      });

      d.currentByCityId({
        cityId: '2172797',
        callback: function(err, data) {
          if (err) throw new Error(err);
          assert.ok(data, 'No data returned from byCityId.');
        }
      });

      d.currentByCoordinates({
        coord: {"lon":139,"lat":35},
        callback: function(err, data) {
          if (err) throw new Error(err);
          assert.ok(data, 'No data returned from byCoordinates.');
        }
      })

      d.currentByZipCode({
        zip: '94040,us',
        callback: function(err, data) {
          if (err) throw new Error(err);
          assert.ok(data, 'No data returned from byZipCode.');
        }
      });

    })
    test.done();
  }
}
