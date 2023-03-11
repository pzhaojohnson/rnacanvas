export const keywordValues = [
  'normal',
  'italic',
  'oblique',
] as const;

export type KeywordValue = typeof keywordValues[number];

function isKeywordValue(value: unknown): value is KeywordValue {
  let kvs: unknown[] = [...keywordValues];
  return kvs.includes(value);
}

/**
 * Right now can only be a keyword value.
 */
export type Value = (
  KeywordValue
);

export type SavedSVGFontStyle = (
  ReturnType<
    InstanceType<typeof SVGFontStyle>['toSaved']
  >
);

export class SVGFontStyle {
  _value: Value;

  /**
   * Throws if the provided value is invalid.
   */
  constructor(value: unknown) {
    this._value = 'normal';

    this.setValue(value);
  }

  getValue() {
    return this._value;
  }

  /**
   * Throws if the provided value is invalid.
   */
  setValue(value: unknown): void | never {
    if (isKeywordValue(value)) {
      this._value = value;
    } else {
      throw new Error(`${value} is not a possible value.`);
    }
  }

  /**
   * Returns the saved form of this SVG font style (in this case simply
   * the primitive value).
   *
   * The saved form of this SVG font style can be directly converted to
   * and from JSON.
   */
  toSaved() {
    return this.getValue();
  }
}
