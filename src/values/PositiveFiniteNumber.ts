export class PositiveFiniteNumber {
  _value: number;

  /**
   * Throws if the provided value is not a positive finite number.
   */
  constructor(value: unknown) {
    this._value = 1;

    this.setValue(value);
  }

  /**
   * The primitive number value.
   */
  getValue(): number {
    return this._value;
  }

  /**
   * Throws if the given value is not a positive finite number.
   */
  setValue(value: unknown): void | never {
    if (typeof value != 'number') {
      throw new Error(`${value} is not a number.`);
    } else if (!Number.isFinite(value)) {
      throw new Error(`${value} is not finite.`);
    } else if (value <= 0) {
      throw new Error(`${value} is not positive.`);
    } else {
      this._value = value;
    }
  }
}