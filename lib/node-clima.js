const request = require('request');

function makeRequest(obj, apikey, format, language, units, url) {
  // const callback = obj.callback;
  const { callback } = obj;

  if (apikey) obj.qs.APPID = apikey;
  // check format for call
  if (format === 'xml') obj.qs.mode = 'xml';
  // check units for call
  if (this.units === 'Celsius') {
    obj.qs.units = 'metric';
  }
  if (units === 'Fahrenheit') {
    obj.qs.units = 'imperial';
  }
  obj.qs.lang = language;
  // console.log(obj);
  request({
    method: 'GET',
    url,
    qs: obj.qs,
  }, (err, response, body) => {
    // console.log(response.statusCode);
    if (err) callback(err, body);
    if ((response.statusCode === 200) || (response.statusCode === 304)) callback(err, body);
    if (response.statusCode === 401) callback(err, body);
  });
}

/*
url format for call current weather data API for one location:
api.openweathermap.org/data/2.5/weather?q=London,uk
/**
  * Create a new Clima instances
  * @class
  * @param {Object} obj - Contains parameters and their values to sent request.
  *
  */
class Clima {
  constructor(obj) {
    // valid formats
    const validFormats = ['json', 'xml'];
    //valid metrics units
    const validUnits = ['Fahrenheit', 'Celsius', 'Kelvin'];
    // valid languages
    const validLanguages = ['en', 'ru', 'it', 'es', 'uk', 'de', 'pt', 'ro', 'pl',
      'fi', 'nl', 'fr', 'bg', 'sv', 'zh_tw', 'zh', 'tr', 'hr', 'ca'];
    // constructor checking
    if (typeof obj !== 'object') {
      throw new Error('invalid options passed to constructor.');
    }
    // api key checking
    if (obj.apikey) {
      if (typeof obj.apikey !== 'string') throw new Error('invalid API KEY.');
    }
    this.apikey = obj.apikey;
    const dataChecking = function (property, data, validData, required) {
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
/*     const validate = function (obj, method) {
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
    }; */

    // error checking
    dataChecking.apply(this, ['format', obj.format, validFormats, true]);
    dataChecking.apply(this, ['units', obj.units, validUnits, false]);
    dataChecking.apply(this, ['language', obj.language, validLanguages, false]);
  }

  currentByCityName(obj) {
    // cityName is required, checking
    if (typeof obj.cityName !== 'string') throw new Error('cityName is not string.');
    // countryCode is optional
    // if exist and is string, add to query
    if (obj.countryCode && typeof obj.countryCode === 'string') {
      const str = `${obj.cityName}, ${obj.countryCode}`;
      /* console.log(str); */
      obj.qs = { q: str };
    } else {
      obj.qs = { q: obj.cityName };
    }
    console.log(obj);
    
    makeRequest(obj, this.apikey, this.format, this.language, this.units, this.url);
  }
}
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

module.exports = Clima;
