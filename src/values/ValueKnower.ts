/**
 * This class is rather simple, but its interface can be reused by
 * more complex value knowers to suit the changing needs of calling
 * code.
 */
export class ValueKnower<T> {
  _valueToKnow: T;

  constructor(valueToKnow: T) {
    this._valueToKnow = valueToKnow;
  }

  /**
   * Returns the value-to-know.
   */
  say(): T {
    return this._valueToKnow;
  }
}
