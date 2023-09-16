import { AllConditionsAreTrue } from './AllConditionsAreTrue';

describe('AllConditionsAreTrue class', () => {
  describe('isTrue method', () => {
    test('zero conditions to report on', () => {
      let conditionsToReportOn = [];

      let allConditionsAreTrue = new AllConditionsAreTrue(conditionsToReportOn);
      expect(allConditionsAreTrue.isTrue()).toBe(true);
    });

    test('one condition to report on that is true', () => {
      let conditionsToReportOn = [
        { isTrue: () => true },
      ];

      let allConditionsAreTrue = new AllConditionsAreTrue(conditionsToReportOn);
      expect(allConditionsAreTrue.isTrue()).toBe(true);
    });

    test('one condition to report on that is false', () => {
      let conditionsToReportOn = [
        { isTrue: () => false },
      ];

      let allConditionsAreTrue = new AllConditionsAreTrue(conditionsToReportOn);
      expect(allConditionsAreTrue.isTrue()).toBe(false);
    });

    test('four conditions to report on that are all true', () => {
      let conditionsToReportOn = [
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
      ];

      let allConditionsAreTrue = new AllConditionsAreTrue(conditionsToReportOn);
      expect(allConditionsAreTrue.isTrue()).toBe(true);
    });

    test('five conditions to report on all but one of which are true', () => {
      let conditionsToReportOn = [
        { isTrue: () => true },
        { isTrue: () => false },
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
      ];

      let allConditionsAreTrue = new AllConditionsAreTrue(conditionsToReportOn);
      expect(allConditionsAreTrue.isTrue()).toBe(false);
    });

    test('four conditions to report on all of which are false', () => {
      let conditionsToReportOn = [
        { isTrue: () => false },
        { isTrue: () => false },
        { isTrue: () => false },
        { isTrue: () => false },
      ];

      let allConditionsAreTrue = new AllConditionsAreTrue(conditionsToReportOn);
      expect(allConditionsAreTrue.isTrue()).toBe(false);
    });
  });
});
