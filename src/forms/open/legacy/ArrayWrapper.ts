export class ArrayWrapper<T> {
  /**
   * The wrapped array.
   */
  readonly array: T[];

  constructor(array: T[]) {
    this.array = array;
  }

  get length(): number {
    return this.array.length;
  }

  /**
   * Returns the item at index i and adds possibly undefined type
   * annotation.
   */
  atIndex(i: number): T | undefined {
    return this.array[i];
  }

  /**
   * Is undefined for an empty array.
   */
  get lastItem(): T | undefined {
    return this.atIndex(this.length - 1);
  }
}
