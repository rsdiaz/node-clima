[![Build Status](https://travis-ci.org/robfree/node-clima.svg?branch=master)](https://travis-ci.org/robfree/node-clima)
node-clima
==========
----------
## Simple wrapper for OpenWeatherMap API for Node.js
Usage:

    var clima = require('node-clima');

    var c = new clima({
		format: 'json',    // required
		units: 'Celsius'  // optional
		});

	c.currentByCityName({
		cityName: 'London'
		callback: function(err, data) {
			console.log(data);
		}
	});
