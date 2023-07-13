import { ShouldSetDecider } from './ShouldSetDecider';

let valueValidator = null;

let differenceChecker = null;

let shouldSetDecider = null;

beforeEach(() => {
  valueValidator = {
    isValid: () => false,
  };

  differenceChecker = {
    checkFor: () => false,
  };

  shouldSetDecider = new ShouldSetDecider({
    valueValidator, differenceChecker,
  });
});

afterEach(() => {
  shouldSetDecider = null;

  differenceChecker = null;

  valueValidator = null;
});

describe('ShouldSetDecider class', () => {
  describe('shouldSetTo method', () => {
    it('passes the submitted value to the value validator', () => {
      valueValidator.isValid = jest.fn(() => false);
      differenceChecker.checkFor = () => true;

      shouldSetDecider.shouldSetTo('8jvcndrk9843ojigrjc');

      expect(valueValidator.isValid).toHaveBeenCalledTimes(1);
      let call = valueValidator.isValid.mock.calls[0];

      expect(call[0]).toBe('8jvcndrk9843ojigrjc');
    });

    it('passes the submitted value to the difference checker', () => {
      valueValidator.isValid = () => true;
      differenceChecker.checkFor = jest.fn(() => false);

      shouldSetDecider.shouldSetTo('981398kjqoefkjd');

      expect(differenceChecker.checkFor).toHaveBeenCalledTimes(1);
      let call = differenceChecker.checkFor.mock.calls[0];

      expect(call[0]).toBe('981398kjqoefkjd');
    });

    test('when the submitted value is both valid and different', () => {
      valueValidator.isValid = () => true;
      differenceChecker.checkFor = () => true;
      expect(shouldSetDecider.shouldSetTo('asdf')).toBe(true);
    });

    test('when the submitted value is valid but not different', () => {
      valueValidator.isValid = () => true;
      differenceChecker.checkFor = () => false;
      expect(shouldSetDecider.shouldSetTo('asdf')).toBe(false);
    });

    test('when the submitted value is different but not valid', () => {
      valueValidator.isValid = () => false;
      differenceChecker.checkFor = () => true;
      expect(shouldSetDecider.shouldSetTo('asdf')).toBe(false);
    });

    test('when the submitted value is neither valid nor different', () => {
      valueValidator.isValid = () => false;
      differenceChecker.checkFor = () => false;
      expect(shouldSetDecider.shouldSetTo('asdf')).toBe(false);
    });
  });
});
