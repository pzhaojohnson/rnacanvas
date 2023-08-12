export interface DuplicateSecondaryBondFinder<SecondaryBond> {
  /**
   * Finds a duplicate secondary bond in the relevant drawing.
   *
   * Returns undefined if there are no duplicate secondary bonds.
   */
  findOne(): SecondaryBond | undefined;
}

export interface SecondaryBondRemover<SecondaryBond> {
  /**
   * Removes the secondary bond from the relevant drawing.
   */
  remove(secondaryBond: SecondaryBond): void;
}

export type ConstructorArgs<SecondaryBond> = {
  duplicateSecondaryBondFinder: DuplicateSecondaryBondFinder<SecondaryBond>;

  secondaryBondRemover: SecondaryBondRemover<SecondaryBond>;
}

export class DuplicateSecondaryBondsRemover<SecondaryBond> {
  _duplicateSecondaryBondFinder: DuplicateSecondaryBondFinder<SecondaryBond>;

  _secondaryBondRemover: SecondaryBondRemover<SecondaryBond>;

  constructor(args: ConstructorArgs<SecondaryBond>) {
    let { duplicateSecondaryBondFinder, secondaryBondRemover } = args;

    this._duplicateSecondaryBondFinder = duplicateSecondaryBondFinder;
    this._secondaryBondRemover = secondaryBondRemover;
  }

  /**
   * Removes all duplicate secondary bonds from the relevant drawing.
   */
  remove() {
    let duplicate = this._duplicateSecondaryBondFinder.findOne();

    while (duplicate) {
      this._secondaryBondRemover.remove(duplicate);
      duplicate = this._duplicateSecondaryBondFinder.findOne();
    }
  }
}
