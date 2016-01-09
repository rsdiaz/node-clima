[![Build Status](https://travis-ci.org/robfree/node-clima.svg?branch=master)](https://travis-ci.org/robfree/node-clima)
# JavaScript OpenWeatherMap API for Node.js
A Node.JS module, which provides an object oriented wrapper for the OpenWeatherMap API.

### Installation
Api Key is required.

    npm install node-clima

Methods API call:

**currentByCityName**

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
