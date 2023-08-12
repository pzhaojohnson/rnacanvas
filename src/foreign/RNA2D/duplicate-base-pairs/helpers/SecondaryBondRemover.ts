/**
 * Receives an array of secondary bonds to remove and the drawing
 * that the secondary bonds are currently in.
 */
export interface RemoveSecondaryBondsFn<Drawing, SecondaryBond> {
  (
    drawing: Drawing,
    secondaryBonds: SecondaryBond[],
    options: { updateLayout: boolean },
  ): void;
}

export type ConstructorArgs<Drawing, SecondaryBond> = {
  /**
   * The drawing to remove secondary bonds from.
   */
  drawing: Drawing;

  /**
   * To be used to remove secondary bonds.
   */
  removeSecondaryBondsFn: RemoveSecondaryBondsFn<Drawing, SecondaryBond>;
}

export class SecondaryBondRemover<Drawing, SecondaryBond> {
  _drawing: Drawing;

  _removeSecondaryBondsFn: RemoveSecondaryBondsFn<Drawing, SecondaryBond>;

  constructor(args: ConstructorArgs<Drawing, SecondaryBond>) {
    let { drawing, removeSecondaryBondsFn } = args;

    this._drawing = drawing;
    this._removeSecondaryBondsFn = removeSecondaryBondsFn;
  }
  /**
   * Removes the secondary bond from the drawing.
   *
   * Secondary bond is assumed to be in the drawing provided to this
   * secondary bond remover at construction.
   *
   * Does not update the layout of the drawing.
   */
  remove(secondaryBond: SecondaryBond) {
    this._removeSecondaryBondsFn(
      this._drawing,
      [secondaryBond],
      { updateLayout: false },
    );
  }
}
