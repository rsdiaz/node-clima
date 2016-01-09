var request = require('request');
/*
url format for call current weather data API for one location:
api.openweathermap.org/data/2.5/weather?q=London,uk
 */

/*constructor
accepts an object.

.format     required      The format for the response [json, xml]
.apikey     required      The api key for the service
.units      optional      The metrics units for the response [Fahrenheit, Celsius, Kelvin] - default: Kelvin
.language   optional      The language for the response
*/
var clima = function(obj) {
  // valid formats
  var validFormats = ['json', 'xml'];
  //valid metrics units
  var validUnits = ['Fahrenheit', 'Celsius', 'Kelvin'];
  // valid languages
  var validLanguages = ['en', 'ru', 'it', 'es', 'uk', 'de', 'pt', 'ro', 'pl',
                        'fi', 'nl', 'fr', 'bg', 'sv', 'zh_tw', 'zh', 'tr', 'hr', 'ca'];

  var dataChecking = function(property, data, validData, required) {
    if (required === true) {
      if (data) {
        if (validData.indexOf(data) > -1) {
          this.property = data;
        }
        else {
          throw new Error('Invalid ' + property + ' specified.');
        }
      }
      else {
        throw new Error(property + ' is required.');
      }
    }
    if (required === false) {
      if (data) {
        if (validData.indexOf(data) > -1) {
          this.property = data;
        }
        else {
          throw new Error('Invalid ' + property + ' specified.')
        }
      }
    }
  }

  // constructor checking
  if(typeof obj != 'object') throw new Error('invalid options passed to constructor.');
  // api key checking
  if (obj.apikey) {
    if(typeof obj.apikey !== 'string') throw new Error('invalid API KEY.');
  }
  this.apikey = obj.apikey;
  // error checking
  dataChecking('format', obj.format, validFormats, true);
  dataChecking('units', obj.units, validUnits, false);
  dataChecking('language', obj.language, validLanguages, false);
}

// defaults
clima.prototype.url = 'http://api.openweathermap.org/data/2.5/weather';
clima.prototype.units = 'Kelvin';
clima.prototype.language = 'en';
// required
clima.prototype.apikey = '';
clima.prototype.format = '';

// You can call by city name or city name and country code.
// API responds with a list of results that match a searching word.
clima.prototype.currentByCityName = function(obj) {

  // cityName is required, checking
  if (!this.validate(obj, 'byCityName')) return false;

  // countryCode is optional
  // if exist and is string, add to query
  if (obj.countryCode && typeof obj.countryCode === 'string') {
    console.log("countryCode it's... " + obj.countryCode);
    var str = obj.cityName + ',' + obj.countryCode;
    console.log(str);
    obj.qs = { 'q': str};
  }
  else {
    obj.qs = { 'q': obj.cityName };
  }

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

  if (this.apikey) obj.qs['APPID'] = this.apikey;
  // check format for call
  if (this.format === 'xml') obj.qs['mode'] = 'xml';
  // check units for call
  if (this.units === 'Celsius') {
    obj.qs['units'] = 'metric';
  }
  if (this.units === 'Fahrenheit') {
    obj.qs['units'] = 'imperial';
  }
  obj.qs['lang'] = this.language;
  request({
    method: 'GET',
    url: this.url,
    qs: obj.qs,
  }, function(err, response, body){
      // console.log(response.statusMessage);
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
