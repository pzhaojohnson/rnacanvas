import { CallbackCondition } from './CallbackCondition';

describe('CallbackCondition class', () => {
  describe('isTrue method', () => {
    it('returns true when the callback returns true', () => {
      let condition = new CallbackCondition(() => true);

      expect(condition.isTrue()).toBe(true);
    });

    it('returns false when the callback returns false', () => {
      let condition = new CallbackCondition(() => false);

      expect(condition.isTrue()).toBe(false);
    });
  });
});
