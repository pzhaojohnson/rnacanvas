import { MedianFinder } from './MedianFinder';

let numbersSorter = null;

let medianFinder = null;

beforeEach(() => {
  numbersSorter = {
    sorted: () => [],
  };

  medianFinder = new MedianFinder({
    numbersSorter,
  });
});

afterEach(() => {
  medianFinder = null;

  numbersSorter = null;
});

describe('MedianFinder class', () => {
  describe('findFor method', () => {
    it('returns NaN for an empty array of numbers', () => {
      let ns = [];

      numbersSorter.sorted = () => [];

      expect(medianFinder.findFor(ns)).toBe(NaN);
    });

    it('passes the numbers to the numbers sorter', () => {
      let ns = [1, 2, 3, 4, 5];

      numbersSorter.sorted = jest.fn(() => []);

      medianFinder.findFor(ns);

      expect(numbersSorter.sorted).toHaveBeenCalledTimes(1);
      expect(numbersSorter.sorted.mock.calls[0][0]).toBe(ns);
    });

    it('returns the middle number of the numbers returned by the numbers sorter', () => {
      let ns = [];

      // returns five numbers
      numbersSorter.sorted = jest.fn(() => [2, 19, 54, 58, 127]);

      expect(medianFinder.findFor(ns)).toBe(54);
    });

    test('an even number of numbers', () => {
      let ns = [];

      // returns six numbers
      numbersSorter.sorted = jest.fn(() => [4, 19, 88, 122, 502, 3819]);

      expect(medianFinder.findFor(ns)).toBe(122);
    });

    test('one number', () => {
      let ns = [];

      numbersSorter.sorted = () => [6];

      expect(medianFinder.findFor(ns)).toBe(6);
    });

    test('two numbers', () => {
      let ns = [];

      numbersSorter.sorted = () => [4, 12];

      expect(medianFinder.findFor(ns)).toBe(12);
    });

    it('does not modify the input array of numbers', () => {
      let ns = [934, 428, 4, 12874, 37, 3917];

      numbersSorter.sorted = jest.fn(() => [1, 2, 3]);

      medianFinder.findFor(ns);

      // is unchanged
      expect(ns).toStrictEqual([934, 428, 4, 12874, 37, 3917]);
    });
  });
});
