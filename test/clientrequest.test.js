import { ClientRequest } from '../lib/clientrequest';
const url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';
const client = new ClientRequest();

describe('Parámetro mal pasados a la función', () => {
  test('url es diferente a string, lanzo error', () => {
    expect(() => {
      client.makeRequest(878);
    }).toThrow();
  });
});

describe('la función devuelve un objeto', () => {
  test('El request a la api devuelve un objeto', () => {
    const json = client.makeRequest(url);
    expect(typeof json).toBe(typeof {});
  });

  test('la promesa responde un objeto', () => {
    return client.makeRequest(url).then(data => {
      expect(typeof data).toBe(typeof {});
    });
  });

  test('the fetch fails with an error', () => {
    return expect(client.makeRequest('jhjhk')).rejects.toThrow('There was a problem with the fetch request');
  });

});