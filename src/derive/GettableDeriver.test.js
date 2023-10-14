import { GettableDeriver } from './GettableDeriver';

describe('GettableDeriver class', () => {
  describe('deriveFrom method', () => {
    it('calls the getter-like method', () => {
      let gettableDeriver = new GettableDeriver('dksoiejf933r');

      let anObject = {
        'dksoiejf933r': jest.fn(),
      };

      gettableDeriver.deriveFrom(anObject);

      expect(anObject.dksoiejf933r).toHaveBeenCalledTimes(1);
    });

    it('returns what the getter-like method returns', () => {
      let gettableDeriver = new GettableDeriver('aGetterLikeMethod');

      let anObject = {
        'aGetterLikeMethod': () => 'cmsiojr91u03refjod',
      };

      expect(gettableDeriver.deriveFrom(anObject)).toBe('cmsiojr91u03refjod');
    });
  });
});
