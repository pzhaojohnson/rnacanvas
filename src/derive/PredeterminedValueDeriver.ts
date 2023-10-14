/**
 * A way to always derive a certain value while still fulfilling a
 * value deriver interface.
 */
export class PredeterminedValueDeriver<T1 extends unknown[], T2> {
  _predeterminedValue: T2;

  constructor(predeterminedValue: T2) {
    this._predeterminedValue = predeterminedValue;
  }

  /**
   * Simply returns the predetermined value regardless of what the
   * values-to-derive-from are.
   */
  deriveFrom(...valuesToDeriveFrom: T1): T2 {
    return this._predeterminedValue;
  }
}
