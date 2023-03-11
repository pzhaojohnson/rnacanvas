export type SavedSVGOpacity = (
  ReturnType<
    InstanceType<typeof SVGOpacity>['toSaved']
  >
);

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

  /**
   * Returns the saved form of this SVG opacity (in this case simply
   * the primitive value).
   *
   * The saved form of this SVG opacity can be directly converted to
   * and from JSON.
   */
  toSaved() {
    return this._value;
  }

  /**
   * Sets the value of this SVG opacity to the saved value.
   */
  applySaved(saved: SavedSVGOpacity): void;

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
