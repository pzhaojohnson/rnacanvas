export interface Bond {
  /**
   * Repositions the bond.
   */
  reposition(): void;
}

export interface AllBondsGetter {
  /**
   * Returns an array of all bonds.
   */
  get(): Bond[];
}

/**
 * Represents the task of repositioning all bonds.
 */
export class RepositionAllBonds {
  _allBondsGetter: AllBondsGetter;

  constructor(args: { allBondsGetter: AllBondsGetter }) {
    let { allBondsGetter } = args;

    this._allBondsGetter = allBondsGetter;
  }

  do() {
    let allBonds = this._allBondsGetter.get();

    allBonds.forEach(bond => bond.reposition());
  }
}
