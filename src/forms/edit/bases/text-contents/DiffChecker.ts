export interface TextContentsGetter {
  /**
   * Returns an array of the text contents of the subject bases.
   */
  get(): string[];
}

export type ConstructorArgs = {
  textContentsGetter: TextContentsGetter;
};

export class DiffChecker {
  readonly _textContentsGetter: TextContentsGetter;

  constructor(args: ConstructorArgs) {
    let { textContentsGetter } = args;

    this._textContentsGetter = textContentsGetter;
  }

  /**
   * Returns true if at least one of the text contents of the subject
   * bases differs from the given value.
   *
   * Returns false otherwise.
   */
  checkFor(value: string): boolean {
    let textContents = this._textContentsGetter.get();

    return textContents.some(tc => tc != value);
  }
}
