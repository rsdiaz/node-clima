// current.ts
import { Clima } from './clima';
import { ClientRequest } from './clientrequest';
import qs from 'querystring';

export class Current extends Clima {

  client: any;
  
  constructor(apiKey: string) {
    super(apiKey);
    this.client = new ClientRequest();
  }

  async byCityName(cityName: string, countryCode: any = null) {
    if(typeof cityName !== 'string') {
      throw new Error('the parameter for byCityName() must be a string');
    } else {
      let query = { q: cityName, appid: this.apiKey }
      return await this.client.makeRequest(this.url + qs.stringify(query));
    }
  }

  async byCityId(cityId: number) {
    if(typeof cityId == 'number') {
      let query = {
        id: cityId,
        appid: this.apiKey 
      }
      return await this.client.makeRequest(this.url + qs.stringify(query));
    } else {
      throw new Error('the parameter for byCityId() must be a number');
    }
  }

  async byGeographicCoordinates(lat: number, lon: number) {
    if(typeof lat == 'number' && typeof lon == 'number') {
      let query = { lat: lat, lon: lon, appid: this.apiKey };
      return await this.client.makeRequest(this.url + qs.stringify(query));
    } else {
      throw new Error('the parameters for byGeographicCoordinates() must be a number');
    }
  }

}
