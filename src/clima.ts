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
  * @param {Object} client - Contains a instance client
  * 
  */

export class Clima {
  url: string = 'http://api.openweathermap.org/data/2.5/weather?';
  client: any;
  apiKey: string;

  constructor(apiKey: string, client: object) {
    checkOptions(apiKey, 'string');
    checkOptions(client, 'object');
    this.client = client;
    this.apiKey = apiKey;
  }

}
