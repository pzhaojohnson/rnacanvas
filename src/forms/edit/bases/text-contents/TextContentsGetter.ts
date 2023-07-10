export interface Base {
  text: {
    /**
     * Returns the text content of the text element of the base.
     */
    text(): string;
  }
}

export type ConstructorArgs = {
  /**
   * The bases to get the text contents of.
   */
  bases: Base[];
};

export class TextContentsGetter {
  readonly _bases: Base[];

  constructor(args: ConstructorArgs) {
    let { bases } = args;

    this._bases = bases;
  }

  /**
   * Returns an array of the text contents of the bases for this text
   * contents getter.
   */
  get(): string[] {
    return this._bases.map(b => b.text.text());
  }
}
