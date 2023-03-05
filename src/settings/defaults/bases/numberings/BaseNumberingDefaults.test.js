import { BaseNumberingDefaults } from './BaseNumberingDefaults';

describe('BaseNumberingDefaults class', () => {
  test('constructor', () => {
    expect(() => new BaseNumberingDefaults())
      .not.toThrow();
  });
});
