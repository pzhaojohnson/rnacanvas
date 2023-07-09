export interface TextPaddingsGetter {
  /**
   * Returns the text paddings for some base numberings.
   */
  get(): number[];
}

export type ConstructorArgs = {
  /**
   * Gets the text paddings used by the difference checker.
   */
  textPaddingsGetter: TextPaddingsGetter;
};

export class DiffChecker {
  readonly _textPaddingsGetter: TextPaddingsGetter;

  constructor(args: ConstructorArgs) {
    let { textPaddingsGetter } = args;

    this._textPaddingsGetter = textPaddingsGetter;
  }

  /**
   * Returns true if at least one text padding differs from the given
   * value and false otherwise.
   */
  someTextPaddingsDifferFrom(value: number): boolean {
    let textPaddings = this._textPaddingsGetter.get();

    return textPaddings.some(tp => tp != value);
  }
}
