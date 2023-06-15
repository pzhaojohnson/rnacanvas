import { ShouldAskBeforeLeavingIndicator } from './ShouldAskBeforeLeavingIndicator';

function createTrueIndicator() {
  return {
    indicate: () => true,
  };
}

function createFalseIndicator() {
  return {
    indicate: () => false,
  };
}

describe('ShouldAskBeforeLeavingIndicator class', () => {
  describe('indicate method', () => {
    test('zero requirements indicators', () => {
      let indicator = new ShouldAskBeforeLeavingIndicator({
        requirementsIndicators: [],
      });

      // the current behavior...
      // (not firmly defined)
      expect(indicator.indicate()).toBe(true);
    });

    test('one requirements indicator that returns true', () => {
      let indicator = new ShouldAskBeforeLeavingIndicator({
        requirementsIndicators: [
          createTrueIndicator(),
        ],
      });

      expect(indicator.indicate()).toBe(true);
    });

    test('one requirements indicator that returns false', () => {
      let indicator = new ShouldAskBeforeLeavingIndicator({
        requirementsIndicators: [
          createFalseIndicator(),
        ],
      });

      expect(indicator.indicate()).toBe(false);
    });

    test('five requirements indicators that all return true', () => {
      let indicator = new ShouldAskBeforeLeavingIndicator({
        requirementsIndicators: [
          createTrueIndicator(),
          createTrueIndicator(),
          createTrueIndicator(),
          createTrueIndicator(),
          createTrueIndicator(),
        ],
      });

      expect(indicator.indicate()).toBe(true);
    });

    test('four requirements indicators and only one returns false', () => {
      let indicator = new ShouldAskBeforeLeavingIndicator({
        requirementsIndicators: [
          createTrueIndicator(),
          createFalseIndicator(),
          createTrueIndicator(),
          createTrueIndicator(),
        ],
      });

      expect(indicator.indicate()).toBe(false);
    });

    test('three requirements indicators that all return false', () => {
      let indicator = new ShouldAskBeforeLeavingIndicator({
        requirementsIndicators: [
          createFalseIndicator(),
          createFalseIndicator(),
          createFalseIndicator(),
        ],
      });

      expect(indicator.indicate()).toBe(false);
    });
  });
});
