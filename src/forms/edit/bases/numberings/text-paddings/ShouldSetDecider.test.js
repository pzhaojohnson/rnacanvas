import { ShouldSetDecider } from './ShouldSetDecider';

let valueValidator = null;

let diffChecker = null;

let decider = null;

beforeEach(() => {
  valueValidator = {
    isValid: () => false,
  };

  diffChecker = {
    someTextPaddingsDifferFrom: () => false,
  };

  decider = new ShouldSetDecider({ valueValidator, diffChecker });
});

afterEach(() => {
  decider = null;

  diffChecker = null;

  valueValidator = null;
});

describe('ShouldSetDecider class', () => {
  describe('shouldSetTo method', () => {
    it('passes value to value validator', () => {
      valueValidator.isValid = jest.fn(() => false);

      decider.shouldSetTo(9.13491);

      expect(valueValidator.isValid).toHaveBeenCalledTimes(1);
      expect(valueValidator.isValid.mock.calls[0][0]).toBe(9.13491);
    });

    it('passes value to difference checker', () => {
      diffChecker.someTextPaddingsDifferFrom = jest.fn(() => false);

      decider.shouldSetTo(61.198519);

      expect(diffChecker.someTextPaddingsDifferFrom).toHaveBeenCalledTimes(1);

      expect(diffChecker.someTextPaddingsDifferFrom.mock.calls[0][0]).toBe(
        61.198519
      );
    });

    test('when the value is valid and some text paddings differ', () => {
      valueValidator.isValid = () => true;
      diffChecker.someTextPaddingsDifferFrom = () => true;
      expect(decider.shouldSetTo(5)).toBe(true);
    });

    test('when the value is valid and no text paddings differ', () => {
      valueValidator.isValid = () => true;
      diffChecker.someTextPaddingsDifferFrom = () => false;
      expect(decider.shouldSetTo(5)).toBe(false);
    });

    test('when the value is invalid and some text paddings differ', () => {
      valueValidator.isValid = () => false;
      diffChecker.someTextPaddingsDifferFrom = () => true;
      expect(decider.shouldSetTo(5)).toBe(false);
    });

    test('when the value is invalid and no text paddings differ', () => {
      valueValidator.isValid = () => false;
      diffChecker.someTextPaddingsDifferFrom = () => false;
      expect(decider.shouldSetTo(5)).toBe(false);
    });
  });
});
