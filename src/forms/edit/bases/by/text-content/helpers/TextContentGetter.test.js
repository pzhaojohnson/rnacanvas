import { TextContentGetter } from './TextContentGetter';

describe('TextContentGetter class', () => {
  describe('getFor method', () => {
    it('returns the text content of the given base', () => {
      let b = {
        text: {
          text: () => '8923oinsd,1091rjekd',
        },
      };

      let getter = new TextContentGetter();
      expect(getter.getFor(b)).toBe('8923oinsd,1091rjekd');
    });
  });
});
