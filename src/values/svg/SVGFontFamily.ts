export type Value = string;

export type SavedSVGFontFamily = (
  ReturnType<
    InstanceType<typeof SVGFontFamily>['toSaved']
  >
);

/**
 * Currently accepts any string as a value.
 */
export class SVGFontFamily {
  _value: Value;

  /**
   * Throws if the provided value is invalid.
   */
  constructor(value: unknown) {
    // a web-safe font
    this._value = 'Arial';

    this.setValue(value);
  }

  getValue() {
    return this._value;
  }

  /**
   * Throws if the provided value is invalid.
   */
  setValue(value: unknown): void | never {
    if (typeof value == 'string') {
      this._value = value;
    } else {
      throw new Error(`${value} is not a string.`);
    }
  }

  /**
   * Returns the saved form of this SVG font family (in this case
   * simply the primitive value).
   *
   * The saved form of this SVG font family can be directly converted
   * to and from JSON.
   */
  toSaved() {
    return this.getValue();
  }

  /**
   * Sets the value of this SVG font family to the saved value.
   */
  applySaved(saved: SavedSVGFontFamily): void;

  /**
   * Since the saved value could be coming from anywhere (e.g., a
   * file), this method is designed to be able to handle any unknown
   * saved value.
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
