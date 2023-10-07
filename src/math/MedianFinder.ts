export interface NumbersSorter {
  /**
   * Returns a copy of the numbers array sorted in ascending order.
   *
   * Does not modify the input numbers array.
   */
  sorted(ns: number[]): number[];
}

export type Helpers = {
  numbersSorter: NumbersSorter;
};

export class MedianFinder {
  _helpers: Helpers;

  constructor(helpers: Helpers) {
    this._helpers = helpers;
  }

  /**
   * Returns the median of the numbers.
   *
   * Returns NaN for an empty array of numbers.
   *
   * Does not modify the input array of numbers.
   */
  findFor(ns: number[]): number {
    let sorted = this._helpers.numbersSorter.sorted(ns);

    if (sorted.length == 0) {
      return NaN;
    } else {
      let i = Math.floor(sorted.length / 2);
      return sorted[i];
    }
  }
}
