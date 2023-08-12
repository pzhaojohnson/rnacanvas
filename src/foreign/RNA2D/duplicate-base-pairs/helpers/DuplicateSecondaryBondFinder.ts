export interface AllSecondaryBondsProvider<SecondaryBond> {
  /**
   * Returns all secondary bonds in the relevant drawing.
   */
  provide(): SecondaryBond[];
}

export interface AreDuplicatesChecker<SecondaryBond> {
  /**
   * Returns true if the two secondary bonds are duplicates and
   * false otherwise.
   *
   * Is expected to return false if the same secondary bond is input
   * twice to this method.
   */
  check(sb1: SecondaryBond, sb2: SecondaryBond): boolean;
}

export type ConstructorArgs<SecondaryBond> = {
  allSecondaryBondsProvider: AllSecondaryBondsProvider<SecondaryBond>;

  areDuplicatesChecker: AreDuplicatesChecker<SecondaryBond>;
};

export class DuplicateSecondaryBondFinder<SecondaryBond> {
  _allSecondaryBondsProvider: AllSecondaryBondsProvider<SecondaryBond>;

  _areDuplicatesChecker: AreDuplicatesChecker<SecondaryBond>;

  constructor(args: ConstructorArgs<SecondaryBond>) {
    let { allSecondaryBondsProvider, areDuplicatesChecker } = args;

    this._allSecondaryBondsProvider = allSecondaryBondsProvider;
    this._areDuplicatesChecker = areDuplicatesChecker;
  }

  /**
   * Finds a duplicate secondary bond in the relevant drawing.
   *
   * Returns undefined if there are no duplicate secondary bonds.
   */
  findOne(): SecondaryBond | undefined {
    let all = this._allSecondaryBondsProvider.provide();

    return all.find(sb1 => {
      let not1 = all.filter(sb2 => sb2 !== sb1);

      return not1.some(sb2 => (
        this._areDuplicatesChecker.check(sb1, sb2)
      ));
    });
  }
}
