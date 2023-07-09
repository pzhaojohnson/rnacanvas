import { ValueToDisplayDeterminer } from './ValueToDisplayDeterminer';

let roundedTextPaddingsGetter = null;

beforeEach(() => {
  roundedTextPaddingsGetter = {
    get: () => [],
  };
});

afterEach(() => {
  roundedTextPaddingsGetter = null;
});

describe('ValueToDisplayDeterminer class', () => {
  describe('determine method', () => {
    test('with zero text paddings', () => {
      roundedTextPaddingsGetter.get = () => [];

      let determiner = new ValueToDisplayDeterminer({
        roundedTextPaddingsGetter,
      });

      expect(determiner.determine()).toBe('');
    });

    test('with one text padding', () => {
      roundedTextPaddingsGetter.get = () => [8.01849];

      let determiner = new ValueToDisplayDeterminer({
        roundedTextPaddingsGetter,
      });

      expect(determiner.determine()).toBe('8.01849');
    });

    test('with four text paddings that are all the same', () => {
      roundedTextPaddingsGetter.get = () => [5.62, 5.62, 5.62, 5.62];

      let determiner = new ValueToDisplayDeterminer({
        roundedTextPaddingsGetter,
      });

      expect(determiner.determine()).toBe('5.62');
    });

    test('with five text paddings where only one is different', () => {
      roundedTextPaddingsGetter.get = () => [3.1, 3.1, 3.1, 3.2, 3.1];

      let determiner = new ValueToDisplayDeterminer({
        roundedTextPaddingsGetter,
      });

      expect(determiner.determine()).toBe('');
    });

    test('with three different text paddings', () => {
      roundedTextPaddingsGetter.get = () => [2, 3, 4];

      let determiner = new ValueToDisplayDeterminer({
        roundedTextPaddingsGetter,
      });

      expect(determiner.determine()).toBe('');
    });
  });
});
