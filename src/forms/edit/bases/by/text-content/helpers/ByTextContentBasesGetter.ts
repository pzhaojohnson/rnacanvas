export interface AllBasesGetter<Base> {
  /**
   * Returns all bases in the relevant structure drawing.
   */
  get(): Base[];
}

export interface ByTextContentFilterer<Base> {
  /**
   * Finds the bases among the provided bases with the specified text
   * content and returns them in a new array.
   */
  filter(args: { bases: Base[], textContent: string }): Base[];
}

export type ConstructorArgs<Base> = {
  allBasesGetter: AllBasesGetter<Base>;

  byTextContentFilterer: ByTextContentFilterer<Base>;
};

export class ByTextContentBasesGetter<Base> {
  readonly _allBasesGetter: AllBasesGetter<Base>;

  readonly _byTextContentFilterer: ByTextContentFilterer<Base>;

  constructor(args: ConstructorArgs<Base>) {
    let { allBasesGetter, byTextContentFilterer } = args;

    this._allBasesGetter = allBasesGetter;

    this._byTextContentFilterer= byTextContentFilterer;
  }

  /**
   * Returns all bases with the specified text content.
   */
  getWith(textContent: string): Base[] {
    let allBases = this._allBasesGetter.get();

    return this._byTextContentFilterer.filter({
      bases: allBases,
      textContent,
    });
  }
}
