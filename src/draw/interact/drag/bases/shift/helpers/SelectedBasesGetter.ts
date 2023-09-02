export interface AllBasesGetter<Base> {
  /**
   * Returns all bases that are in the relevant drawing.
   */
  get(): Base[];
}

export interface BaseIsSelectedChecker<Base> {
  /**
   * Returns true if the base is currently selected and false
   * otherwise.
   */
  check(b: Base): boolean;
}

export type SelectedBasesGetterCtorParams<Base> = {
  allBasesGetter: AllBasesGetter<Base>;

  baseIsSelectedChecker: BaseIsSelectedChecker<Base>;
};

export class SelectedBasesGetter<Base> {
  _allBasesGetter: AllBasesGetter<Base>;

  _baseIsSelectedChecker: BaseIsSelectedChecker<Base>;

  constructor(args: SelectedBasesGetterCtorParams<Base>) {
    this._allBasesGetter = args.allBasesGetter;

    this._baseIsSelectedChecker = args.baseIsSelectedChecker;
  }

  /**
   * Returns the currently selected bases.
   */
  get(): Base[] {
    let allBases = this._allBasesGetter.get();

    return allBases.filter(b => this._baseIsSelectedChecker.check(b));
  }
}
