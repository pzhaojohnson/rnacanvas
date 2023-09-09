export interface AllBasesInOrderGetter<Base> {
  /**
   * Returns an array of all the bases in the relevant drawing in
   * the order that they are arranged in in the drawing (e.g., taking
   * into account sequences in the drawing).
   */
  get(): Base[];
}

export type SpannedBasesGetterCtorParams<Base> = {
  allBasesInOrderGetter: AllBasesInOrderGetter<Base>;
};

export class SpannedBasesGetter<Base> {
  _allBasesInOrderGetter: AllBasesInOrderGetter<Base>;

  constructor(args: SpannedBasesGetterCtorParams<Base>) {
    this._allBasesInOrderGetter = args.allBasesInOrderGetter;
  }

  /**
   * Returns all the bases that are between the two bases (along with
   * the two bases themselves) based on how bases are ordered in the
   * relevant drawing (e.g., taking into account sequences in the
   * drawing).
   *
   * If bases 1 and 2 are actually the same base, then an array of
   * just that one base is returned.
   */
  getFor(base1: Base, base2: Base): Base[] {
    let allBasesInOrder = this._allBasesInOrderGetter.get();

    let i1 = allBasesInOrder.indexOf(base1);
    let i2 = allBasesInOrder.indexOf(base2);

    if (i1 < 0) {
      return [];
    } else if (i2 < 0) {
      return [];
    }

    return allBasesInOrder.slice(
      Math.min(i1, i2),
      Math.max(i1, i2) + 1,
    );
  }
}
