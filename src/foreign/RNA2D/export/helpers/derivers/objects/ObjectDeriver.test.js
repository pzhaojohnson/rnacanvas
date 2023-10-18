import { ObjectDeriver } from './ObjectDeriver';

describe('ObjectDeriver class', () => {
  describe('deriveFrom method', () => {
    it('passes the input value to each property deriver', () => {
      let propertyDerivers = [
        { propertyName: 'asdf', valueDeriver: { deriveFrom: jest.fn() } },
        { propertyName: 'qwer', valueDeriver: { deriveFrom: jest.fn() } },
        { propertyName: 'zxcv', valueDeriver: { deriveFrom: jest.fn() } },
        { propertyName: 'ASDF', valueDeriver: { deriveFrom: jest.fn() } },
      ];

      let objectDeriver = new ObjectDeriver(propertyDerivers);

      objectDeriver.deriveFrom('saldifjowefisljld');

      expect(propertyDerivers[0].valueDeriver.deriveFrom.mock.calls[0][0]).toBe('saldifjowefisljld');
      expect(propertyDerivers[1].valueDeriver.deriveFrom.mock.calls[0][0]).toBe('saldifjowefisljld');
      expect(propertyDerivers[2].valueDeriver.deriveFrom.mock.calls[0][0]).toBe('saldifjowefisljld');
      expect(propertyDerivers[3].valueDeriver.deriveFrom.mock.calls[0][0]).toBe('saldifjowefisljld');
    });

    it('assigns all values derived by the helper property derivers to the correct property names', () => {
      let objectDeriver = new ObjectDeriver([
        { propertyName: 'AA', valueDeriver: { deriveFrom: () => 2 } },
        { propertyName: 'qsrf', valueDeriver: { deriveFrom: () => null } },
        { propertyName: 'BBB', valueDeriver: { deriveFrom: () => 'wiuejf' } },
        { propertyName: 'property1', valueDeriver: { deriveFrom: () => 3849 } },
        { propertyName: 'qpwoeiru', valueDeriver: { deriveFrom: () => 'xcnvj' } },
      ]);

      expect(objectDeriver.deriveFrom('asdf')).toStrictEqual({
        'AA': 2,
        'qsrf': null,
        'BBB': 'wiuejf',
        'property1': 3849,
        'qpwoeiru': 'xcnvj',
      });
    });
  });
});
