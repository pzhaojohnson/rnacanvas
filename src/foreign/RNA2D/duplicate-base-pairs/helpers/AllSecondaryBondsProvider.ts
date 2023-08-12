/**
 * A structure drawing.
 */
export interface Drawing<SecondaryBond> {
  /**
   * Holds all secondary bonds in the drawing.
   */
  secondaryBonds: SecondaryBond[];
}

export type ConstructorArgs<SecondaryBond> = {
  drawing: Drawing<SecondaryBond>;
};

export class AllSecondaryBondsProvider<SecondaryBond> {
  _drawing: Drawing<SecondaryBond>;

  constructor(args: ConstructorArgs<SecondaryBond>) {
    let { drawing } = args;

    this._drawing = drawing;
  }

  /**
   * Returns all secondary bonds in the drawing for this
   * all-secondary-bonds provider.
   */
  provide(): SecondaryBond[] {
    return this._drawing.secondaryBonds;
  }
}
