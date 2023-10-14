export interface Deriver<T1, T2> {
  /**
   * Derives a value from a given value.
   */
  deriveFrom(valueToDeriveFrom: T1): T2;
}

/**
 * Chains two derivers together sequentially.
 */
export class ChainedDerivers<T1, T2, T3> implements Deriver<T1, T3> {
  _first: Deriver<T1, T2>;
  _second: Deriver<T2, T3>;

  constructor(first: Deriver<T1, T2>, second: Deriver<T2, T3>) {
    this._first = first;
    this._second = second;
  }

  /**
   * First inputs the value-to-derive-from to the first deriver.
   *
   * Then inputs the value derived by the first deriver to the second
   * deriver.
   *
   * Returns the value derived by the second deriver.
   */
  deriveFrom(valueToDeriveFrom: T1): T3 {
    let firstDerivedValue = this._first.deriveFrom(valueToDeriveFrom);

    return this._second.deriveFrom(firstDerivedValue);
  }
}
