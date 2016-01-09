[![Build Status](https://travis-ci.org/robfree/node-clima.svg?branch=master)](https://travis-ci.org/robfree/node-clima)
# node-clima
## Simple wrapper for OpenWeatherMap API for Node.js

Methods API call:

**currentByCityName**
You can call by city name or city name and country code. API responds with a list of results that match a searching word.
**currentByCityId**

**currentByCoordinates**

**currentByZip**

for more info [http://openweathermap.org](http://openweathermap.org/current#other)

Usage:


    var clima = require('node-clima');

    var c = new clima({
	     format: 'json',    // required
       apikey: 'your api key'   // REQUIRED
       units: 'Celsius'  // optional
	  });

	  c.currentByCityName({
      cityName: 'London',
		    callback: function(err, data) {
		    console.log(data);
		  }
	  });
