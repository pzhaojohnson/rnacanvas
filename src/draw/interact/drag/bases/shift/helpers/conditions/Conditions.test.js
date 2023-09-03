import { Conditions } from './Conditions';

describe('Conditions class', () => {
  describe('allAreTrue method', () => {
    test('zero encapsulated conditions', () => {
      let conditions = new Conditions({ conditions: [] });

      // vacuously true
      expect(conditions.allAreTrue()).toBe(true);
    });

    test('all five encapsulated conditions are true', () => {
      let encapsulatedConditions = [
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
      ];

      let conditions = new Conditions({ conditions: encapsulatedConditions });

      expect(conditions.allAreTrue()).toBe(true);
    });

    test('all but one of five encapsulated conditions are true', () => {
      let encapsulatedConditions = [
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => true },
        { isTrue: () => false },
        { isTrue: () => true },
      ];

      let conditions = new Conditions({ conditions: encapsulatedConditions });

      expect(conditions.allAreTrue()).toBe(false);
    });
  });
});
