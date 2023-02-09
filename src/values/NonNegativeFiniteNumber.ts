export class NonNegativeFiniteNumber {
  _value: number;

  /**
   * Throws if the provided value is not a nonnegative finite number.
   */
  constructor(value: unknown) {
    this._value = 0;

    this.setValue(value);
  }

  /**
   * The primitive number value.
   */
  getValue(): number {
    return this._value;
  }

  /**
   * Throws if the provided value is not a nonnegative finite number.
   */
  setValue(value: unknown): void | never {
    if (typeof value != 'number') {
      throw new Error(`${value} is not a number.`);
    } else if (!Number.isFinite(value)) {
      throw new Error(`${value} is not finite.`);
    } else if (value < 0) {
      throw new Error(`${value} is negative.`);
    } else {
      this._value = value;
    }
  }
}
