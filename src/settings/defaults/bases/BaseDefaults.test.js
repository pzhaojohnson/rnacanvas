import { BaseDefaults } from './BaseDefaults';

describe('BaseDefaults class', () => {
  test('constructor', () => {
    expect(() => new BaseDefaults())
      .not.toThrow();
  });
});
