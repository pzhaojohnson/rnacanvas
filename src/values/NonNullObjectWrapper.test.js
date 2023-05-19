import { NonNullObjectWrapper } from './NonNullObjectWrapper';

describe('NonNullObjectWrapper class', () => {
  describe('constructor', () => {
    it('stores object', () => {
      let o = { 'asdf': 2 };
      let wrapper = new NonNullObjectWrapper(o);
      expect(wrapper.wrappee).toBe(o);
    });

    it('throws if passed value is not a non-null object', () => {
      expect(() => new NonNullObjectWrapper(null)).toThrow();
      expect(() => new NonNullObjectWrapper(2)).toThrow();
    });
  });

  test('getProperty method', () => {
    let o = { 'asdf': 57, 'Q': false };
    let wrapper = new NonNullObjectWrapper(o);

    // existing properties
    expect(wrapper.getProperty('asdf')).toBe(57);
    expect(wrapper.getProperty('Q')).toBe(false);

    // a non-existent property
    expect(wrapper.getProperty('qwer')).toBeUndefined();
  });

  test('getStringProperty method', () => {
    let o = { '23': 'ASf sdf', 'zzz': 5 };
    let wrapper = new NonNullObjectWrapper(o);

    // a string property
    expect(wrapper.getStringProperty('23')).toBe('ASf sdf');

    // not a string property
    expect(() => wrapper.getStringProperty('zzz')).toThrow();

    // a non-existent property
    expect(() => wrapper.getStringProperty('mmm')).toThrow();
  });

  test('getNumberProperty method', () => {
    let o = { 'zxcv': 108, '555': '24', 'asdf': false };
    let wrapper = new NonNullObjectWrapper(o);

    // a number property
    expect(wrapper.getNumberProperty('zxcv')).toBe(108);

    // some properties that are not numbers
    expect(() => wrapper.getNumberProperty('555')).toThrow();
    expect(() => wrapper.getNumberProperty('asdf')).toThrow();

    // a non-existent property
    expect(() => wrapper.getNumberProperty('p')).toThrow();
  });

  test('getArrayProperty method', () => {
    let o = { 'a': [], 'zcxv': [5, 55, 'c'], 'tt': 67, 'pYCF': true };
    let wrapper = new NonNullObjectWrapper(o);

    // some array properties
    expect(wrapper.getArrayProperty('a')).toStrictEqual([]);
    expect(wrapper.getArrayProperty('zcxv')).toStrictEqual([5, 55, 'c']);

    // some properties that are not arrays
    expect(() => wrapper.getArrayProperty('tt')).toThrow();
    expect(() => wrapper.getArrayProperty('pYCF')).toThrow();

    // a non-existent property
    expect(() => wrapper.getArrayProperty('qwer')).toThrow();
  });
});
