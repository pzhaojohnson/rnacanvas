export class NumbersSorter {
  /**
   * Returns a copy of the numbers array sorted in ascending order.
   *
   * Does not modify the input numbers array.
   */
  sorted(ns: number[]): number[] {
    let nsCopy = [...ns];
    nsCopy.sort((a, b) => a - b);
    return nsCopy;
  }
}
