import { ClientRequest } from '../lib/clientrequest';
import { Clima } from '../lib/clima';

const client = new ClientRequest();

describe('Opciones mal pasadas al constructor', () => {
  test('apiKey no es string, lanzo error.', () => {
    expect(() => {
      const api = new Clima(8878, client);
    }).toThrow(Error);
  });
});

describe('Propiedades de la clase Clima correctas', () => {
  const api = new Clima('apiKey', client);
  test('Clima.url es de tipo string', () => {
    expect(typeof api.url).toBe(typeof 'string');
  });

/*   test('Clima.client es de tipo object', () => {
    expect(typeof api.client).toBe(typeof {});
  });
 */
});
