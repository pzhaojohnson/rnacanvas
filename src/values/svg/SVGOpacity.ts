/**
 * A number between 0 and 1 inclusive.
 *
 * Does not currently support strings of percentages.
 */
export class SVGOpacity {
  _value: number;

  /**
   * Throws if the provided value is not a number between 0 and 1
   * inclusive.
   */
  constructor(value: unknown) {
    this._value = 1;

    this.setValue(value);
  }

  /**
   * Returns the primitive number value.
   */
  getValue(): number {
    return this._value;
  }

  /**
   * Throws if the provided value is not a number between 0 and 1
   * inclusive.
   */
  setValue(value: unknown) {
    if (typeof value != 'number') {
      throw new Error(`${value} is not a number.`);
    } else if (!Number.isFinite(value)) {
      throw new Error(`${value} is not finite.`);
    } else if (value < 0) {
      throw new Error(`${value} is less than 0.`);
    } else if (value > 1) {
      throw new Error(`${value} is greater than 1.`);
    } else {
      this._value = value;
    }
  }
}
