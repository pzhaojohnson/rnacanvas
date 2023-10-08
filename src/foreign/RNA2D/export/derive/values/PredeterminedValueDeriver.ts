export type Config<T2> = {
  predeterminedValue: T2;
};

/**
 * A way to always derive a certain value while still fulfilling a
 * value deriver interface.
 */
export class PredeterminedValueDeriver<T1, T2> {
  _config: Config<T2>;

  constructor(config: Config<T2>) {
    this._config = config;
  }

  /**
   * Simply returns the predetermined value regardless of what the
   * value-to-derive-from is.
   */
  deriveFrom(valueToDeriveFrom: T1): T2 {
    return this._config.predeterminedValue;
  }
}
