export interface Deriver<T1, T2> {
  /**
   * Derives a value from a given value.
   */
  deriveFrom(valueToDeriveFrom: T1): T2;
}

export class FromEachDeriver<T1, T2> implements Deriver<T1[], T2[]> {
  _deriverToEncapsulate: Deriver<T1, T2>;

  constructor(deriverToEncapsulate: Deriver<T1, T2>) {
    this._deriverToEncapsulate = deriverToEncapsulate;
  }

  /**
   * Applies the encapsulated deriver to each value in the array of
   * values-to-derive-from and returns all derived values (in the
   * same order as their corresponding values in the array of
   * values-to-derive-from).
   */
  deriveFrom(valuesToDeriveFrom: T1[]): T2[] {
    return valuesToDeriveFrom.map(v => this._deriverToEncapsulate.deriveFrom(v));
  }
}
