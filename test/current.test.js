import { Current } from '../lib/current';

const apiKey = 'YOUR API KEY';
const current = new Current(apiKey);

describe('Incorrect parameters in the methods of the Current class', () => {

  test('byCityName different from string, I throw error', () => {
    return expect(current.byCityName(1234)).rejects.toThrow('the parameter for byCityName() must be a string');
  });

  test('byCityId different from number, I throw error', () => {
    return expect(current.byCityId('jkjh')).rejects.toThrow('the parameter for byCityId() must be a number');
  });

  test('byGeographicCoordinates different from number, I throw error', () => {
    return expect(current.byGeographicCoordinates('jkjh', 112)).rejects.toThrow('the parameters for byGeographicCoordinates() must be a number');
  });

});

describe('Methods of the class Current, resolve object', () => {

  test('method byCityName() resolve object', () => {
    return expect(current.byCityName('Tarragona')).resolves.toHaveProperty('cod')
  });

  test('method byCityId() resolve object', async () => {
    return expect(current.byCityId(3432)).resolves.toHaveProperty('cod')
  });

  test('method byGeographicCoordinates() resolve object', async () => {
    return expect(current.byGeographicCoordinates(35, 139)).resolves.toHaveProperty('cod')
  });

});