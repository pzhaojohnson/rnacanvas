import { TextPaddingRememberer } from './TextPaddingRememberer';

let rememberer = null;

beforeEach(() => {
  rememberer = new TextPaddingRememberer();
});

afterEach(() => {
  rememberer = null;
});

describe('TextPaddingRememberer class', () => {
  describe('remember method', () => {
    test('when the text padding property was saved properly', () => {
      expect(rememberer.remember({ textPadding: 0 })).toBe(0);
      expect(rememberer.remember({ textPadding: 6.39841 })).toBe(6.39841);
      expect(rememberer.remember({ textPadding: 12.07 })).toBe(12.07);
    });

    test('when the text padding property was not saved', () => {
      expect(rememberer.remember({})).toBe(4);
    });

    test('when the saved text padding property is not a number', () => {
      expect(rememberer.remember({ textPadding: undefined })).toBe(4);
      expect(rememberer.remember({ textPadding: null })).toBe(4);
      expect(rememberer.remember({ textPadding: '' })).toBe(4);
      expect(rememberer.remember({ textPadding: 'QWERzxcv' })).toBe(4);
      expect(rememberer.remember({ textPadding: false })).toBe(4);
      expect(rememberer.remember({ textPadding: {} })).toBe(4);
    });

    test('non-object inputs', () => {
      expect(rememberer.remember(undefined)).toBe(4);
      expect(rememberer.remember(null)).toBe(4);
      expect(rememberer.remember(2)).toBe(4);
      expect(rememberer.remember('')).toBe(4);
      expect(rememberer.remember('asdf')).toBe(4);
      expect(rememberer.remember(true)).toBe(4);
    });
  });
});
