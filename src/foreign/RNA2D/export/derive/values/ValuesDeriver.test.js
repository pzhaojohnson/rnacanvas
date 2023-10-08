import { ValuesDeriver } from './ValuesDeriver';

describe('ValuesDeriver class', () => {
  describe('deriveFrom method', () => {
    it('passes the value-to-derive-from to each helper value deriver', () => {
      let valueDerivers = [
        { deriveFrom: jest.fn(() => undefined) },
        { deriveFrom: jest.fn(() => undefined) },
        { deriveFrom: jest.fn(() => undefined) },
        { deriveFrom: jest.fn(() => undefined) },
      ];

      let valuesDeriver = new ValuesDeriver({ valueDerivers });

      valuesDeriver.deriveFrom('98adsfihudkdaf');

      valueDerivers.forEach(valueDeriver => {
        expect(valueDeriver.deriveFrom).toHaveBeenCalledTimes(1);
        expect(valueDeriver.deriveFrom.mock.calls[0][0]).toBe('98adsfihudkdaf');
      });
    });

    it('returns all values derived by the helper value derivers', () => {
      let valueDerivers = [
        { deriveFrom: () => 57 },
        { deriveFrom: () => false },
        { deriveFrom: () => 'asdjvx98c' },
        { deriveFrom: () => null },
        { deriveFrom: () => [52, 'cxjoi', null] },
      ];

      let valuesDeriver = new ValuesDeriver({ valueDerivers });

      expect(valuesDeriver.deriveFrom('asdf')).toStrictEqual([
        57,
        false,
        'asdjvx98c',
        null,
        [52, 'cxjoi', null],
      ]);
    });

    test('an empty array of helper value derivers', () => {
      let valueDerivers = [];

      let valuesDeriver = new ValuesDeriver({ valueDerivers });

      expect(valuesDeriver.deriveFrom('asdf')).toStrictEqual([]);
    });
  });
});
