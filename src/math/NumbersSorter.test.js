import { NumbersSorter } from './NumbersSorter';

let numbersSorter = null;

beforeEach(() => {
  numbersSorter = new NumbersSorter();
});

afterEach(() => {
  numbersSorter = null;
});

describe('NumbersSorter class', () => {
  describe('sorted method', () => {
    test('an empty array of numbers', () => {
      let ns = [];

      expect(numbersSorter.sorted(ns)).toStrictEqual([]);
    });

    test('one number', () => {
      let ns = [12];

      expect(numbersSorter.sorted(ns)).toStrictEqual([12]);
    });

    test('two numbers', () => {
      let ns = [21, -4];

      expect(numbersSorter.sorted(ns)).toStrictEqual([-4, 21]);
    });

    test('eight numbers', () => {
      let ns = [38, -1, 3892, 37, 3.128, -93, 35181, 25];

      expect(numbersSorter.sorted(ns)).toStrictEqual([-93, -1, 3.128, 25, 37, 38, 3892, 35181]);
    });

    test('nonfinite numbers', () => {
      let ns = [5, Infinity, 891, NaN, 55, -Infinity, 2.5];

      expect(numbersSorter.sorted(ns)).toStrictEqual([-Infinity, 2.5, 5, 55, 891, Infinity, NaN]);
    });

    it('does not modify the input array of numbers', () => {
      let ns = [5, 4, 3, 2, 1];

      expect(numbersSorter.sorted(ns)).toStrictEqual([1, 2, 3, 4, 5]);

      // is unchanged
      expect(ns).toStrictEqual([5, 4, 3, 2, 1]);
    });
  });
});
