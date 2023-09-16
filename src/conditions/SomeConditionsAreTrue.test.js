import { SomeConditionsAreTrue } from './SomeConditionsAreTrue';

describe('SomeConditionsAreTrue class', () => {
  describe('isTrue method', () => {
    test('no conditions to report on', () => {
      let conditionsToReportOn = [];

      let someConditionsAreTrue = new SomeConditionsAreTrue(conditionsToReportOn);
      expect(someConditionsAreTrue.isTrue()).toBe(false);
    });

    test('one condition to report on that is true', () => {
      let conditionsToReportOn = [
        { isTrue: () => true },
      ];

      let someConditionsAreTrue = new SomeConditionsAreTrue(conditionsToReportOn);
      expect(someConditionsAreTrue.isTrue()).toBe(true);
    });

    test('one condition to report on that is false', () => {
      let conditionsToReportOn = [
        { isTrue: () => false },
      ];

      let someConditionsAreTrue = new SomeConditionsAreTrue(conditionsToReportOn);
      expect(someConditionsAreTrue.isTrue()).toBe(false);
    });

    test('four conditions to report on that are all true', () => {
      let conditionsToReportOn = [
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
      ];

      let someConditionsAreTrue = new SomeConditionsAreTrue(conditionsToReportOn);
      expect(someConditionsAreTrue.isTrue()).toBe(true);
    });

    test('five conditions to report on only one of which is true', () => {
      let conditionsToReportOn = [
        { isTrue: () => false },
        { isTrue: () => false },
        { isTrue: () => false },
        { isTrue: () => true },
        { isTrue: () => false },
      ];

      let someConditionsAreTrue = new SomeConditionsAreTrue(conditionsToReportOn);
      expect(someConditionsAreTrue.isTrue()).toBe(true);
    });

    test('three conditions to report on that are all false', () => {
      let conditionsToReportOn = [
        { isTrue: () => false },
        { isTrue: () => false },
        { isTrue: () => false },
      ];

      let someConditionsAreTrue = new SomeConditionsAreTrue(conditionsToReportOn);
      expect(someConditionsAreTrue.isTrue()).toBe(false);
    });
  });
});
