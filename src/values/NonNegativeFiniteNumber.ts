export type SavedNonNegativeFiniteNumber = (
  ReturnType<
    InstanceType<typeof NonNegativeFiniteNumber>['toSaved']
  >
);

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

  /**
   * Returns the saved form of this nonnegative finite number (in this
   * case simply the primitive value).
   *
   * The saved form of this nonnegative finite number can be directly
   * converted to and from JSON.
   */
  toSaved() {
    return this._value;
  }

  /**
   * Sets the value of this nonnegative finite number to the saved
   * value.
   */
  applySaved(saved: SavedNonNegativeFiniteNumber): void;

  /**
   * Since the saved value could have been read from a file, this
   * method is designed to be able to handle any unknown saved value.
   *
   * Invalid saved values and values of undefined are ignored.
   */
  applySaved(value: unknown): void;

  applySaved(value: unknown) {
    if (value === undefined) {
      return;
    }

    try {
      this.setValue(value);
    } catch {}
  }
}
