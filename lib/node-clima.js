var request = require('request');


/*

url format for call current weather data API for one location:
api.openweathermap.org/data/2.5/weather?q=London,uk

 */


/*constructor
accepts an object.

.format     required      The format for the response [json, xml]
.units      optional      The metrics units for the response [Fahrenheit, Celsius, Kelvin] - default: Kelvin

*/
var clima = function(obj) {
  // valid formats
  var validFormats = ['json', 'xml'];
  //valid metrics units
  var metricUnits = ['Fahrenheit', 'Celsius', 'Kelvin'];

  // error checking
  if(typeof obj != 'object') throw new Error('invalid options passed to constructor');
  if (obj.format) {
    if (validFormats.indexOf(obj.format) > -1) {
      this.format = obj.format;
    }
    else {
      throw new Error('invalid format specified.');
    }
  }
  else {
    throw new Error('Format is required.');
  }
  if (obj.units) {
    if (metricUnits.indexOf(obj.units) > -1) {
      this.units = obj.units;
    }
    else {
      throw new Error('invalid metrics units specified.')
    }
  }
}

// defaults
clima.prototype.url = 'http://api.openweathermap.org/data/2.5/weather';
clima.prototype.units = 'Kelvin';

clima.prototype.format = '';

// You can call by city name or city name and country code.
// API responds with a list of results that match a searching word.
clima.prototype.currentByCityName = function(obj) {

  if (!this.validate(obj, 'byCityName')) return false;
  obj.qs = { 'q': obj.cityName };
  this.makeRequest(obj);
}

// You can call by city ID. API responds with exact result.
// List of city ID city.list.json.gz can be downloaded here http://bulk.openweathermap.org/sample/
clima.prototype.currentByCityId = function(obj) {
  if (!this.validate(obj, 'byCityId')) return false;
  obj.qs = { 'id': obj.cityId };
  this.makeRequest(obj);
}

clima.prototype.currentByCoordinates = function(obj) {
  if (!this.validate(obj, 'byCoordinates')) return false;
  obj.qs = {'lon': obj.coord.lon, 'lat': obj.coord.lat};
  this.makeRequest(obj);
}

clima.prototype.currentByZipCode = function(obj) {
  if (!this.validate(obj, 'byZipCode')) return false;
  obj.qs = { 'zip': obj.zip };
  this.makeRequest(obj);
}

clima.prototype.validate = function(obj, method) {
  var error;

  if (!obj) throw new Error('no arguments passed');

  //if the user doesn't pass a callback, it makes no sense
  if (typeof obj.callback != 'function') throw new Error('invalid callback');

  switch(method) {
    case 'byCityName':
      if (typeof obj.cityName !== 'string') error = ('invalid cityName.');
      break;
    case 'byCityId':
      if (typeof obj.cityId !== 'string' && typeof obj.cityId !== 'number') error = ('invalid or missing arguments method');
      break;
    case 'byCoordinates':
      if (typeof obj.coord !== 'object') error = ('invalid coord.');
      break;
    case 'byZipCode':
      if (typeof obj.zip !== 'string') error = ('invalid zip.');
      break;
  }
  if (error) {
    obj.callback(error);
    return false;
  }
  return true;
}


clima.prototype.makeRequest = function(obj) {
  var callback = obj.callback;

  // check format for call
  if(this.format === 'xml') obj.qs['mode'] = 'xml';
  // check units for call
  if (this.units === 'Celsius') {
    obj.qs['units'] = 'metric';
  }
  if (this.units === 'Fahrenheit') {
    obj.qs['units'] = 'imperial';
  }

  request({
    method: 'GET',
    url: this.url,
    qs: obj.qs,
    // json: true
  }, function(err, response, body){
    if (err) {
      callback(err, body);
    }
    if ((response.statusCode === 200) || (response.statusCode === 304)) {
      // console.log(body);
      callback(err, body);
    }
  })
}

module.exports = clima;
