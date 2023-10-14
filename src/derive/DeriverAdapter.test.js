import { DeriverAdapter } from './DeriverAdapter';

describe('DeriverAdapter class', () => {
  describe('deriveFrom method', () => {
    it('passes parameters to the adapted object', () => {
      let objectToAdapt = {
        'arbitraryMethod2984283': jest.fn(),
      };

      let deriverAdapter = new DeriverAdapter(objectToAdapt, 'arbitraryMethod2984283');

      expect(objectToAdapt.arbitraryMethod2984283).not.toHaveBeenCalled();

      deriverAdapter.deriveFrom('asdifjw', 328, null, false, '0942rje');

      expect(objectToAdapt.arbitraryMethod2984283).toHaveBeenCalledTimes(1);

      expect(objectToAdapt.arbitraryMethod2984283.mock.calls[0][0]).toBe('asdifjw');
      expect(objectToAdapt.arbitraryMethod2984283.mock.calls[0][1]).toBe(328);
      expect(objectToAdapt.arbitraryMethod2984283.mock.calls[0][2]).toBe(null);
      expect(objectToAdapt.arbitraryMethod2984283.mock.calls[0][3]).toBe(false);
      expect(objectToAdapt.arbitraryMethod2984283.mock.calls[0][4]).toBe('0942rje');
    });

    it('returns what the adapted object returns', () => {
      let objectToAdapt = {
        'method93731488': () => 'ld9203rufoijdf293',
      };

      let deriverAdapter = new DeriverAdapter(objectToAdapt, 'method93731488');

      expect(deriverAdapter.deriveFrom()).toBe('ld9203rufoijdf293');
    });
  });
});
