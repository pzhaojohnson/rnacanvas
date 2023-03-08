import { SecondaryBondDefaults } from './SecondaryBondDefaults';

describe('SecondaryBondDefaults class', () => {
  test('constructor', () => {
    expect(() => new SecondaryBondDefaults())
      .not.toThrow();
  });
});
