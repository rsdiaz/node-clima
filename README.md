[![Build Status](https://travis-ci.org/rsdiaz/node-clima.svg?branch=master)](https://travis-ci.org/rsdiaz/node-clima)
[![Coverage Status](https://coveralls.io/repos/github/rsdiaz/node-clima/badge.svg?branch=master)](https://coveralls.io/github/rsdiaz/node-clima?branch=master)

# JavaScript OpenWeatherMap API for Node.js
A Node.JS module, which provides an object oriented wrapper for the OpenWeatherMap API.

Api Key is required.
Get your API key from [here](http://home.openweathermap.org/users/sign_in)
### Installation
Install with the Node.JS package manager.

    npm install node-clima

Install via git clone:

    $ git clone git://github.com/rsdiaz/node-clima.git
    $ cd node-clima
    $ npm install

### Documentation
You can find the docs for the API of this client at http://rsdiaz.github.io/node-clima/doc/index.html.

Additionally, the official OpenWeatherMap API documentation is a very useful resource. [http://openweathermap.org](http://openweathermap.org/current#other)

Methods API call:

**Current.byCityName()**

**Current.byCityId()**

**Current.byGeographicCoordinates()**

### Example
Print all data to the console.

Usage:

```
const Client = require('node-clima').ClientRequest;
const Current = require('node-clima').Current;

var apiKey = 'YOUR API KEY'
var client = new Client();
var current = new Current(apiKey, client);

current.byCityName('Tarragona')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Running the Tests
The unit tests are based on the nodeunit module, which may be installed via npm. To run the tests make sure that the npm dependencies are installed by running npm install from the project directory.

    $ npm run test

Note that a connection to the internet is required to run the tests.

### License
MIT license. See the LICENSE file for details.
[here]: http://home.openweathermap.org/users/sign_in
