import { RoundedTextPaddingsGetter } from './RoundedTextPaddingsGetter';

let textPaddingsGetter = null;

beforeEach(() => {
  textPaddingsGetter = {
    get: () => [],
  };
});

afterEach(() => {
  textPaddingsGetter = null;
});

describe('RoundedTextPaddingsGetter class', () => {
  describe('get method', () => {
    test('with zero text paddings', () => {
      textPaddingsGetter.get = () => [];

      let roundedTextPaddingsGetter = new RoundedTextPaddingsGetter({
        textPaddingsGetter,
        places: 2,
      });

      expect(roundedTextPaddingsGetter.get()).toStrictEqual(
        []
      );
    });

    test('with one text padding', () => {
      textPaddingsGetter.get = () => [8.1895191];

      let roundedTextPaddingsGetter = new RoundedTextPaddingsGetter({
        textPaddingsGetter,
        places: 5,
      });

      expect(roundedTextPaddingsGetter.get()).toStrictEqual(
        [8.18952]
      );
    });

    test('with 5 text paddings', () => {
      textPaddingsGetter.get = () => [3, 6.191451, 4.1473419, 23.18, 6.19871];

      let roundedTextPaddingsGetter = new RoundedTextPaddingsGetter({
        textPaddingsGetter,
        places: 3,
      });

      expect(roundedTextPaddingsGetter.get()).toStrictEqual(
        [3, 6.191, 4.147, 23.18, 6.199]
      );
    });

    it('can round up', () => {
      textPaddingsGetter.get = () => [12.209];

      let roundedTextPaddingsGetter = new RoundedTextPaddingsGetter({
        textPaddingsGetter,
        places: 2,
      });

      expect(roundedTextPaddingsGetter.get()).toStrictEqual(
        [12.21]
      );
    });

    it('can round down', () => {
      textPaddingsGetter.get = () => [6.12893];

      let roundedTextPaddingsGetter = new RoundedTextPaddingsGetter({
        textPaddingsGetter,
        places: 4,
      });

      expect(roundedTextPaddingsGetter.get()).toStrictEqual(
        [6.1289]
      );
    });

    it('does not round text paddings that do not need to be', () => {
      textPaddingsGetter.get = () => [5, 7.1];

      let roundedTextPaddingsGetter = new RoundedTextPaddingsGetter({
        textPaddingsGetter,
        places: 3,
      });

      expect(roundedTextPaddingsGetter.get()).toStrictEqual(
        [5, 7.1],
      );
    });
  });
});
