export interface TextContentsGetter {
  /**
   * Returns an array of the text contents of the subject bases.
   */
  get(): string[];
}

export type ConstructorArgs = {
  textContentsGetter: TextContentsGetter;
};

export class ValueToDisplayProvider {
  readonly _textContentsGetter: TextContentsGetter;

  constructor(args: ConstructorArgs) {
    let { textContentsGetter } = args;

    this._textContentsGetter = textContentsGetter;
  }

  /**
   * Returns a value (to be displayed in an input element, for example)
   * that reflects to the user the current text contents of the subject
   * bases.
   *
   * Returns a empty string if the subject bases do not all have the
   * same text contents.
   */
  provide(): string {
    let textContents = new Set(
      this._textContentsGetter.get()
    );

    if (textContents.size == 1) {
      return textContents.values().next().value;
    } else {
      return '';
    }
  }
}
