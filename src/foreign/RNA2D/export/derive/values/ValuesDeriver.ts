export interface ValueDeriver<T> {
  /**
   * Derives a value from the given value.
   */
  deriveFrom(valueToDeriveFrom: T): unknown;
}

export type Helpers<T> = {
  valueDerivers: ValueDeriver<T>[];
};

export class ValuesDeriver<T> {
  _helpers: Helpers<T>;

  constructor(helpers: Helpers<T>) {
    this._helpers = helpers;
  }

  /**
   * Applies each helper value deriver to the value-to-derive-from
   * and returns all derived values.
   */
  deriveFrom(valueToDeriveFrom: T): unknown[] {
    let valueDerivers = this._helpers.valueDerivers;

    return valueDerivers.map(valueDeriver => valueDeriver.deriveFrom(valueToDeriveFrom));
  }
}
