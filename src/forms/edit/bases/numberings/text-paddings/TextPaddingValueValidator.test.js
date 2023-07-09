import { TextPaddingValueValidator } from './TextPaddingValueValidator';

let validator = null;

beforeEach(() => {
  validator = new TextPaddingValueValidator();
});

afterEach(() => {
  validator = null;
});

describe('TextPaddingValueValidator class', () => {
  describe('isValid method', () => {
    test('nonfinite values', () => {
      expect(validator.isValid(NaN)).toBe(false);
      expect(validator.isValid(Infinity)).toBe(false);
      expect(validator.isValid(-Infinity)).toBe(false);
    });

    test('negative values', () => {
      expect(validator.isValid(-0.00001)).toBe(false);
      expect(validator.isValid(-1)).toBe(false);
      expect(validator.isValid(-8)).toBe(false);
      expect(validator.isValid(-12.1719)).toBe(false);
    });

    test('a value of zero', () => {
      expect(validator.isValid(0)).toBe(true);
    });

    test('positive values', () => {
      expect(validator.isValid(0.00001)).toBe(true);
      expect(validator.isValid(1)).toBe(true);
      expect(validator.isValid(2.1759)).toBe(true);
      expect(validator.isValid(12)).toBe(true);
    });
  });
});
