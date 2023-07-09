import { TextPaddingsGetter } from './TextPaddingsGetter';

describe('TextPaddingsGetter class', () => {
  describe('get method', () => {
    test('with zero base numberings', () => {
      let baseNumberings = [];

      let getter = new TextPaddingsGetter({ baseNumberings });

      expect(getter.get()).toStrictEqual([]);
    });

    test('with one base numbering', () => {
      let baseNumberings = [
        { textPadding: 8.19815 },
      ];

      let getter = new TextPaddingsGetter({ baseNumberings });

      expect(getter.get()).toStrictEqual(
        [8.19815]
      );
    });

    test('with four base numberings', () => {
      let baseNumberings = [
        { textPadding: 2 },
        { textPadding: 6.141 },
        { textPadding: 7.104 },
        { textPadding: 0 },
      ];

      let getter = new TextPaddingsGetter({ baseNumberings });

      expect(getter.get()).toStrictEqual(
        [2, 6.141, 7.104, 0]
      );
    });
  });
});
