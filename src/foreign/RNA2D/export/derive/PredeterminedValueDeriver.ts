/**
 * A way to always derive a certain value while still fulfilling a
 * value deriver interface.
 */
export class PredeterminedValueDeriver<T1, T2> {
  _predeterminedValue: T2;

  constructor(predeterminedValue: T2) {
    this._predeterminedValue = predeterminedValue;
  }

  /**
   * Simply returns the predetermined value regardless of what the
   * value-to-derive-from is.
   */
  deriveFrom(valueToDeriveFrom: T1): T2 {
    return this._predeterminedValue;
  }
}
