// eslint-disable-next-line no-unused-vars
import { Clima, IClima } from './clima';
import { ClientRequest } from './clientrequest';
import qs from 'querystring';

export class HourlyForecast extends Clima implements IClima {
  client: any;
  hourlyForecast: string;

  constructor (apiKey: string) {
    super(apiKey);
    this.client = new ClientRequest();
    this.hourlyForecast = '/forecast/hourly?';
  }

  async byCityName (cityName: string) {
    if (typeof cityName !== 'string') {
      throw new Error('the parameter for byCityName() must be a string.');
    } else {
      const query = { q: cityName, appid: this.apiKey };
      const response = await this.client.makeRequest(`${this.url}${this.hourlyForecast}${qs.stringify(query)}`);
      return response;
    }
  }

  async byCityId (cityId: number) {
    if (typeof cityId === 'number') {
      const query = {
        id: cityId,
        appid: this.apiKey
      };
      const response = await this.client.makeRequest(`${this.url}${this.hourlyForecast}${qs.stringify(query)}`);
      return response;
    } else {
      throw new Error('the parameter for byCityId() must be a number.');
    }
  }

  async byGeographicCoordinates (lat: number, lon: number) {
    if (typeof lat === 'number' && typeof lon === 'number') {
      const query = { lat: lat, lon: lon, appid: this.apiKey };
      const response = await this.client.makeRequest(`${this.url}${this.hourlyForecast}${qs.stringify(query)}`);
      return response;
    } else {
      throw new Error('the parameters for byGeographicCoordinates() must be a number.');
    }
  }
}
