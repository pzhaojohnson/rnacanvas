import { PrimaryBondDefaults } from './PrimaryBondDefaults';

describe('PrimaryBondDefaults class', () => {
  test('constructor', () => {
    expect(() => new PrimaryBondDefaults())
      .not.toThrow();
  });
});
