var clima = require('../lib/node-clima.js');
var assert = require('assert');

d = new clima({
  format: 'json',
  units: 'Celsius'
});

module.exports = {
  'Opciones pasadas al constructor invalidas.': function(test) {
    test.expect(1);
    test.throws(function(){
      c = new clima();
    }, Error, 'Opciones pasadas al constructor invalidas, no lanzo error');
    test.done();
  },
  'Tipo de datos format pasados al constructor invalido': function(test) {
    test.expect(1);
    test.throws(function() {
      var c = new clima({
        format: ['212', '212']
      })
    }, Error, 'Tipo de datos format invalido');
    test.done();
  },
  'Tipo de datos units pasados al constructor invalido': function(test) {
    test.expect(1);
    test.throws(function() {
      var c = new clima({
        units: 12313
      })
    }, Error, 'Tipo de datos format invalido');
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
