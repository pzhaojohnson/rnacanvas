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
});
