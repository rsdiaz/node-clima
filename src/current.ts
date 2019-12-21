// current.ts
import { Clima, IClima } from './clima';
import { ClientRequest } from './clientrequest';
import qs from 'querystring';

export class Current extends Clima implements IClima {
  client: any;
  constructor (apiKey: string) {
    super(apiKey);
    this.client = new ClientRequest();
  }

  async byCityName (cityName: string, countryCode: string) {
    if (typeof cityName !== 'string') {
      throw new Error('the parameter for byCityName() must be a string.');
    } else {
      const query = { q: cityName, appid: this.apiKey };
      const response = await this.client.makeRequest(this.url + qs.stringify(query));
      return response;
    }
  }

  async byCityId (cityId: number) {
    if (typeof cityId === 'number') {
      const query = {
        id: cityId,
        appid: this.apiKey
      };
      const response = await this.client.makeRequest(this.url + qs.stringify(query));
      return response;
    } else {
      throw new Error('the parameter for byCityId() must be a number.');
    }
  }

  async byGeographicCoordinates (lat: number, lon: number) {
    if (typeof lat === 'number' && typeof lon === 'number') {
      const query = { lat: lat, lon: lon, appid: this.apiKey };
      const response = await this.client.makeRequest(this.url + qs.stringify(query));
      return response;
    } else {
      throw new Error('the parameters for byGeographicCoordinates() must be a number.');
    }
  }

  async byZipCode (zipCode: string, countryCode: string) {
    if (typeof zipCode !== 'string' || typeof countryCode !== 'string') {
      throw new Error('the parameters for byZipCode() must be a string.');
    } else {
      const zipQs = `${zipCode},${countryCode}`;
      const query = { zip: zipQs, appid: this.apiKey };
      const response = await this.client.makeRequest(this.url + qs.stringify(query));
      return response;
    }
  }
}
