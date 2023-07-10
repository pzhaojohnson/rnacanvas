import { ShouldSetDecider } from './ShouldSetDecider';

let textContentValidator = null;

let shouldSetDecider = null;

beforeEach(() => {
  textContentValidator = {
    isValid: () => false,
  };

  shouldSetDecider = new ShouldSetDecider({
    textContentValidator,
  });
});

afterEach(() => {
  shouldSetDecider = null;

  textContentValidator = null;
});

describe('ShouldSetDecider class', () => {
  describe('shouldSetTo method', () => {
    it('passes the submitted value to the text content validator', () => {
      textContentValidator.isValid = jest.fn(() => false);

      shouldSetDecider.shouldSetTo('kjhdvhkuaoiw2378');

      expect(textContentValidator.isValid).toHaveBeenCalledTimes(1);

      expect(textContentValidator.isValid.mock.calls[0][0]).toBe(
        'kjhdvhkuaoiw2378'
      );
    });

    it('returns true if the text content validator returns true', () => {
      textContentValidator.isValid = () => true;

      expect(shouldSetDecider.shouldSetTo('A')).toBe(true);
    });

    it('returns false if the text content validator returns false', () => {
      textContentValidator.isValid = () => false;

      expect(shouldSetDecider.shouldSetTo('A')).toBe(false);
    });
  });
});
