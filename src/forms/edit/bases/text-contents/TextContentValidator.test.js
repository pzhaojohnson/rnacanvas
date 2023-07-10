import { TextContentValidator } from './TextContentValidator';

let textContentValidator = null;

beforeEach(() => {
  textContentValidator = new TextContentValidator();
});

afterEach(() => {
  textContentValidator = null;
});

describe('TextContentValidator class', () => {
  describe('isValid method', () => {
    test('an empty string', () => {
      expect(textContentValidator.isValid('')).toBe(false);
    });

    test('strings that are all whitespace', () => {
      expect(textContentValidator.isValid(' ')).toBe(false);
      expect(textContentValidator.isValid('     ')).toBe(false);
      expect(textContentValidator.isValid('\t\n')).toBe(false);
      expect(textContentValidator.isValid('  \t  \n\n ')).toBe(false);
    });

    test('strings with no whitespace', () => {
      expect(textContentValidator.isValid('A')).toBe(true);
      expect(textContentValidator.isValid('c')).toBe(true);
      expect(textContentValidator.isValid('Agj')).toBe(true);
      expect(textContentValidator.isValid('pgks')).toBe(true);
    });

    test('strings with some whitespace', () => {
      expect(textContentValidator.isValid('   A')).toBe(true);
      expect(textContentValidator.isValid('G    ')).toBe(true);
      expect(textContentValidator.isValid('   asdf   ')).toBe(true);
      expect(textContentValidator.isValid('\tA  ckx\nkso\n\n')).toBe(true);
    });
  });
});
