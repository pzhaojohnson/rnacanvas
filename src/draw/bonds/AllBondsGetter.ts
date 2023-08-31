/**
 * A nucleic acid structure drawing.
 */
export interface Drawing<PrimaryBond, SecondaryBond, TertiaryBond> {
  primaryBonds: PrimaryBond[];
  secondaryBonds: SecondaryBond[];
  tertiaryBonds: TertiaryBond[];
}

export type ConstructorArgs<PrimaryBond, SecondaryBond, TertiaryBond> = {
  drawing: Drawing<PrimaryBond, SecondaryBond, TertiaryBond>;
};

export class AllBondsGetter<PrimaryBond, SecondaryBond, TertiaryBond> {
  _drawing: Drawing<PrimaryBond, SecondaryBond, TertiaryBond>;

  constructor(args: ConstructorArgs<PrimaryBond, SecondaryBond, TertiaryBond>) {
    let { drawing } = args;

    this._drawing = drawing;
  }

  /**
   * Returns an array of all the bonds in the drawing for this
   * all-bonds getter.
   */
  get(): (PrimaryBond | SecondaryBond | TertiaryBond)[] {
    return [
      ...this._drawing.primaryBonds,
      ...this._drawing.secondaryBonds,
      ...this._drawing.tertiaryBonds,
    ];
  }
}
