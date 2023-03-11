export type SavedPositiveFiniteNumber = (
  ReturnType<
    InstanceType<typeof PositiveFiniteNumber>['toSaved']
  >
);

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

  /**
   * Returns the saved form of this positive finite number (in this
   * case simply the primitive value).
   *
   * The saved form of this positive finite number can be directly
   * converted to and from JSON.
   */
  toSaved() {
    return this.getValue();
  }

  /**
   * Sets the value of this positive finite number to the saved value.
   */
  applySaved(saved: SavedPositiveFiniteNumber): void;

  /**
   * Since the saved value could have been read from a file, this
   * method is designed to be able to handle any unknown saved value.
   *
   * Invalid saved values and values of undefined are ignored.
   */
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    if (saved === undefined) {
      return;
    }

    try {
      this.setValue(saved);
    } catch {}
  }
}
