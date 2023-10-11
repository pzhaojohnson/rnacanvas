import { Derivers } from './Derivers';

describe('Derivers class', () => {
  describe('deriveFrom method', () => {
    it('passes the value-to-derive-from to each encapsulated deriver', () => {
      let encapsulatedDerivers = [
        { deriveFrom: jest.fn(() => undefined) },
        { deriveFrom: jest.fn(() => undefined) },
        { deriveFrom: jest.fn(() => undefined) },
        { deriveFrom: jest.fn(() => undefined) },
      ];

      let derivers = new Derivers(encapsulatedDerivers);

      derivers.deriveFrom('98adsfihudkdaf');

      encapsulatedDerivers.forEach(deriver => {
        expect(deriver.deriveFrom).toHaveBeenCalledTimes(1);
        expect(deriver.deriveFrom.mock.calls[0][0]).toBe('98adsfihudkdaf');
      });
    });

    it('returns all values derived by the encapsulated derivers', () => {
      let encapsulatedDerivers = [
        { deriveFrom: () => 57 },
        { deriveFrom: () => false },
        { deriveFrom: () => 'asdjvx98c' },
        { deriveFrom: () => null },
        { deriveFrom: () => [52, 'cxjoi', null] },
      ];

      let derivers = new Derivers(encapsulatedDerivers);

      expect(derivers.deriveFrom('asdf')).toStrictEqual([
        57,
        false,
        'asdjvx98c',
        null,
        [52, 'cxjoi', null],
      ]);
    });

    test('an empty array of encapsulated derivers', () => {
      let encapsulatedDerivers = [];

      let derivers = new Derivers(encapsulatedDerivers);

      expect(derivers.deriveFrom('asdf')).toStrictEqual([]);
    });
  });
});
