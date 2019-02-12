const request = require('request');
/*
url format for call current weather data API for one location:
api.openweathermap.org/data/2.5/weather?q=London,uk
 */

/** section: current
 *
 *  ##### Params on the `obj` object:
 *
 *  - format (String): Required, format for the response [json, xml].
 *  - apiKey (String): Required, your api key for the OpenWeatherMap service.
 *  - units (String): Optional, the metrics units for the response [Fahrenheit, Celsius, Kelvin] - default: Kelvin.
 *  - language (String): Optional, the language for the response. - default en
 **/

/**
  * Create a new Clima instances
  * @class
  * @param {Object} obj - Contains parameters and their values to sent request.
  *
  */
const Clima = function (obj) {
  // valid formats
  const validFormats = ['json', 'xml'];
  //valid metrics units
  const validUnits = ['Fahrenheit', 'Celsius', 'Kelvin'];
  // valid languages
  const validLanguages = ['en', 'ru', 'it', 'es', 'uk', 'de', 'pt', 'ro', 'pl',
    'fi', 'nl', 'fr', 'bg', 'sv', 'zh_tw', 'zh', 'tr', 'hr', 'ca'];

  let dataChecking = function (property, data, validData, required) {
    if (required === true) {
      if (data) {
        if (validData.indexOf(data) > -1) {
          this[property] = data;
        } else {
          throw new Error('format to response is invalid');
        }
      } else {
        throw new Error('format to response is required');
      }
    }
    if (required === false) {
      if (data) {
        if (validData.indexOf(data) > -1) {
          this[property] = data;
        } else {
          throw new Error(`Invalid ${property} specified.`);
        }
      }
    }
  };
  let validate = function (obj, method) {
    let error;
    if (!obj) throw new Error('no arguments passed');
    //if the user doesn't pass a callback, it makes no sense
    if (typeof obj.callback !== 'function') throw new Error('invalid callback');
    switch (method) {
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
      default:
        throw new Error('validate method Error.');
    }
    if (error) {
      obj.callback(error);
      return false;
    }
    return true;
  };
  // constructor checking
  if (typeof obj !== 'object') throw new Error('invalid options passed to constructor.');
  // api key checking
  if (obj.apikey) {
    if (typeof obj.apikey !== 'string') throw new Error('invalid API KEY.');
  }
  this.apikey = obj.apikey;
  // error checking
  dataChecking.apply(this, ['format', obj.format, validFormats, true]);
  dataChecking.apply(this, ['units', obj.units, validUnits, false]);
  dataChecking.apply(this, ['language', obj.language, validLanguages, false]);
  /* * section: current
 *  Clima.currentByCityName(obj) -> null
 *    - obj (Object): Object that contains parameters and their values to sent request.
 *
 *  ##### Params on the `obj` object:
 *
 *  - cityName (String): Required, city name.
 *  - countryCode (String): Optional, country code.
 *  - callback (Function): Required, function callback.
 *
 * http://openweathermap.org/current#other
 **/
  // You can call by city name or city name and country code.
  // API responds with a list of results that match a searching word.
  this.currentByCityName = function (obj) {
    // cityName is required, checking
    if (!validate.apply(this, [obj, 'byCityName'])) return false;
    // countryCode is optional
    // if exist and is string, add to query
    if (obj.countryCode && typeof obj.countryCode === 'string') {
      console.log(`countryCode it's... ${obj.countryCode}`);
      const str = `${obj.cityName}, ${obj.countryCode}`;
      console.log(str);
      obj.qs = { q: str };
    } else {
      obj.qs = { q: obj.cityName };
    }
    this.makeRequest(obj);
  };
};

// defaults
/**
 *  Clima.url -> String
 **/
Clima.prototype.url = 'http://api.openweathermap.org/data/2.5/weather';
/**
 *  Clima.units -> String
 **/
Clima.prototype.units = 'Kelvin';
/**
 *  Clima.language -> String
 **/
Clima.prototype.language = 'en';
// required
/**
 *  Clima.apikey -> String
 **/
Clima.prototype.apikey = '';
/**
 *  Clima.format -> String
 **/
Clima.prototype.format = '';

// You can call by city ID. API responds with exact result.
// List of city ID city.list.json.gz can be downloaded here http://bulk.openweathermap.org/sample/
Clima.prototype.currentByCityId = function (obj) {
  if (!this.validate(obj, 'byCityId')) return false;
  obj.qs = { id: obj.cityId };
  this.makeRequest(obj);
};

Clima.prototype.currentByCoordinates = function (obj) {
  if (!this.validate(obj, 'byCoordinates')) return false;
  obj.qs = { lon: obj.coord.lon, lat: obj.coord.lat };
  this.makeRequest(obj);
};

Clima.prototype.currentByZipCode = function (obj) {
  if (!this.validate(obj, 'byZipCode')) return false;
  obj.qs = { zip: obj.zip };
  this.makeRequest(obj);
};

/* Clima.prototype.validate = function (obj, method) {
  let error;

  if (!obj) throw new Error('no arguments passed');

  //if the user doesn't pass a callback, it makes no sense
  if (typeof obj.callback !== 'function') throw new Error('invalid callback');

  switch (method) {
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
    default:
      throw new Error('validate method Error.');
  }
  if (error) {
    obj.callback(error);
    return false;
  }
  return true;
};
 */
Clima.prototype.makeRequest = function (obj) {
  const callback = obj.callback;

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
  // console.log(obj);
  request({
    method: 'GET',
    url: this.url,
    qs: obj.qs,
  }, (err, response, body) => {
    // console.log(response.statusCode);
    if (err) callback(err, body);
    if ((response.statusCode === 200) || (response.statusCode === 304)) callback(err, body);
    if (response.statusCode === 401) callback(err, body);
  });
};

module.exports = Clima;
