export interface Deriver<T1, T2> {
  /**
   * Derives a value from the given value.
   */
  deriveFrom(valueToDeriveFrom: T1): T2;
}

export class Derivers<T> implements Deriver<T, unknown[]> {
  _derivers: Deriver<T, unknown>[];

  constructor(derivers: Deriver<T, unknown>[]) {
    this._derivers = derivers;
  }

  /**
   * Inputs the value-to-derive-from to each encapsulated deriver
   * and returns all derived values (in the same order as their
   * corresponding encapsulated derivers).
   */
  deriveFrom(valueToDeriveFrom: T): unknown[] {
    return this._derivers.map(deriver => deriver.deriveFrom(valueToDeriveFrom));
  }
}
