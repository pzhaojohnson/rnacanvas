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
});
