// main.ts
const current = require('../lib/current');
const hourlyForecast = require('../lib/hourly-forecast');

exports.Current = current.Current;
exports.HourlyForecast = hourlyForecast.HourlyForecast;
