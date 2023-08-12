/**
 * A secondary bond between two bases.
 */
export interface SecondaryBond<Base> {
  readonly base1: Base;
  readonly base2: Base;

  /**
   * Returns true if the secondary bond binds the base.
   */
  binds(b: Base): boolean;
}

export class AreDuplicatesChecker<Base> {
  /**
   * Returns true if the two secondary bonds bind the same two bases
   * and false otherwise.
   *
   * Returns false if the same secondary bond object is input twice
   * to this method.
   */
  check(sb1: SecondaryBond<Base>, sb2: SecondaryBond<Base>): boolean {
    let areNotTheSameObject = sb1 !== sb2;

    return (
      sb2.binds(sb1.base1)
      && sb2.binds(sb1.base2)
      && areNotTheSameObject
    );
  }
}
