import { ObjectDeriver } from './ObjectDeriver';

describe('ObjectDeriver class', () => {
  describe('deriveFrom method', () => {
    it('passes the value-to-derive-from to all the helper property derivers', () => {
      let propertyDerivers = [
        { deriveFrom: jest.fn(() => ({ name: 'asdf', value: 'asdf' })) },
        { deriveFrom: jest.fn(() => ({ name: 'asdf', value: 'asdf' })) },
        { deriveFrom: jest.fn(() => ({ name: 'asdf', value: 'asdf' })) },
        { deriveFrom: jest.fn(() => ({ name: 'asdf', value: 'asdf' })) },
        { deriveFrom: jest.fn(() => ({ name: 'asdf', value: 'asdf' })) },
      ];

      let objectDeriver = new ObjectDeriver({ propertyDerivers });

      objectDeriver.deriveFrom('s98923r8hfaeskdl');

      propertyDerivers.forEach(propertyDeriver => {
        expect(propertyDeriver.deriveFrom).toHaveBeenCalledTimes(1);
      });

      propertyDerivers.forEach(propertyDeriver => {
        expect(propertyDeriver.deriveFrom.mock.calls[0][0]).toBe('s98923r8hfaeskdl');
      });
    });

    it('fills in the derived object with all the derived properties', () => {
      let propertyDerivers = [
        { deriveFrom: () => ({ name: 'asdf', value: 'blah' }) },
        { deriveFrom: () => ({ name: 'qwer', value: 2 }) },
        { deriveFrom: () => ({ name: 'Q', value: [5, 19, 3] }) },
        { deriveFrom: () => ({ name: '21', value: false }) },
        { deriveFrom: () => ({ name: 'zxcv', value: null }) },
      ];

      let objectDeriver = new ObjectDeriver({ propertyDerivers });

      expect(objectDeriver.deriveFrom('asdf')).toStrictEqual({
        'asdf': 'blah',
        'qwer': 2,
        'Q': [5, 19, 3],
        '21': false,
        'zxcv': null,
      });
    });

    test('an empty array of helper property derivers', () => {
      let propertyDerivers = [];

      let objectDeriver = new ObjectDeriver({ propertyDerivers });

      expect(objectDeriver.deriveFrom('asdf')).toStrictEqual({});
    });
  });
});
