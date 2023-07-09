import { DiffChecker } from './DiffChecker';

describe('DiffChecker class', () => {
  describe('someTextPaddingsDifferFrom method', () => {
    test('for zero text paddings', () => {
      let textPaddingsGetter = { get: () => [] };

      let checker = new DiffChecker({ textPaddingsGetter });

      expect(checker.someTextPaddingsDifferFrom(5)).toBe(false);
    });

    test('for one text padding that does differ', () => {
      let textPaddingsGetter = { get: () => [4.5] };

      let checker = new DiffChecker({ textPaddingsGetter });

      expect(checker.someTextPaddingsDifferFrom(6.01)).toBe(true);
    });

    test('for one text padding that does not differ', () => {
      let textPaddingsGetter = { get: () => [4.19] };

      let checker = new DiffChecker({ textPaddingsGetter });

      expect(checker.someTextPaddingsDifferFrom(4.19)).toBe(false);
    });

    test('for four text paddings that all differ', () => {
      let textPaddingsGetter = { get: () => [0, 3, 7.15, 8.22] };

      let checker = new DiffChecker({ textPaddingsGetter });

      expect(checker.someTextPaddingsDifferFrom(7.16)).toBe(true);
    });

    test('for four text paddings with only one that differs', () => {
      let textPaddingsGetter = {
        get: () => [12.082, 12.083, 12.082, 12.082],
      };

      let checker = new DiffChecker({ textPaddingsGetter });

      expect(checker.someTextPaddingsDifferFrom(12.082)).toBe(true);
    });

    test('for four text paddings that do not differ', () => {
      let textPaddingsGetter = { get: () => [3.98, 3.98, 3.98, 3.98] };

      let checker = new DiffChecker({ textPaddingsGetter });

      expect(checker.someTextPaddingsDifferFrom(3.98)).toBe(false);
    });
  });
});
