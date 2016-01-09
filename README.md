[![Build Status](https://travis-ci.org/robfree/node-clima.svg?branch=master)](https://travis-ci.org/robfree/node-clima)
# JavaScript OpenWeatherMap API for Node.js
A Node.JS module, which provides an object oriented wrapper for the OpenWeatherMap API.

Api Key is required.
Get your API key from [here].
### Installation
Install with the Node.JS package manager.

    npm install node-clima

Install via git clone:

    $ git clone git://github.com/robfree/node-clima.git
    $ cd node-clima
    $ npm install

### Documentation
You can find the docs for the API of this client at http://robfree.github.io/node-clima/.
Additionally, the official OpenWeatherMap API documentation is a very useful resource. [http://openweathermap.org](http://openweathermap.org/current#other)

Methods API call:

**currentByCityName**

**currentByCityId**

**currentByCoordinates**

**currentByZip**


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
[here]: http://home.openweathermap.org/users/sign_in
