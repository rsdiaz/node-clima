// clima.ts
function checkOptions(option: any, type: string ) {
  if(typeof option !== type) {
    throw new Error(`invalid ${option} passed to constructor.`);
  }
}

/**
  * Create a new Clima instances
  * @class
  * @param {String} apiKey - Contains your API KEY
  * 
  */

export class Clima {
  url: string = 'http://api.openweathermap.org/data/2.5/weather?';
  apiKey: string;

  constructor(apiKey: string) {
    checkOptions(apiKey, 'string');
    this.apiKey = apiKey;
  }

}
