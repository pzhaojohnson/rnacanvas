import { ConditionIsFalse } from './ConditionIsFalse';

let conditionToReportOn = null;

let conditionIsFalse = null;

beforeEach(() => {
  conditionToReportOn = {
    isTrue: () => false,
  };

  conditionIsFalse = new ConditionIsFalse(conditionToReportOn);
});

afterEach(() => {
  conditionIsFalse = null;

  conditionToReportOn = null;
});

describe('ConditionIsFalse class', () => {
  describe('isTrue method', () => {
    test('condition to report on is true', () => {
      conditionToReportOn.isTrue = () => true;
      expect(conditionIsFalse.isTrue()).toBe(false);
    });

    test('condition to report on is false', () => {
      conditionToReportOn.isTrue = () => false;
      expect(conditionIsFalse.isTrue()).toBe(true);
    });
  });
});
