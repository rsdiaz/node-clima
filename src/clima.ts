// clima.ts

export interface IClima {
  url: string;
}

/**
  * Create a new Clima instances
  * @class
  * @param {String} apiKey - Contains your API KEY
  */

export class Clima implements IClima {
  url: string = 'http://api.openweathermap.org/data/2.5';
  apiKey: string;

  constructor (apiKey: string) {
    if (typeof apiKey !== 'string') throw new Error('invalid apiKey passed to constructor.');
    this.apiKey = apiKey;
  }
}
