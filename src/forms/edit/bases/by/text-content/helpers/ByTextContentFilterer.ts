export interface TextContentGetter<Base> {
  /**
   * Returns the text content of the given base.
   */
  getFor(b: Base): string;
};

export type ConstructorArgs<Base> = {
  /**
   * Used to get the text contents of bases.
   */
  textContentGetter: TextContentGetter<Base>;
};

export type FilterMethodArgs<Base> = {
  /**
   * The bases to filter.
   */
  bases: Base[];

  textContent: string;
}

export class ByTextContentFilterer<Base> {
  readonly _textContentGetter: TextContentGetter<Base>;

  constructor(args: ConstructorArgs<Base>) {
    let { textContentGetter } = args;

    this._textContentGetter = textContentGetter;
  }

  /**
   * Finds the bases that have the specified text content and returns
   * a new array of them.
   *
   * Does not modify the provided bases array.
   */
  filter(args: FilterMethodArgs<Base>): Base[] {
    let { bases, textContent } = args;

    return bases.filter(
      b => this._textContentGetter.getFor(b) == textContent
    );
  }
}
