export interface ValueDeriver<T> {
  deriveFrom(valueToDeriveFrom: T): unknown;
}

export type DerivedProperty = {
  name: string;
  value: unknown;
}

export type Config<T> = {
  propertyName: string;

  valueDeriver: ValueDeriver<T>;
};

export class PropertyDeriver<T> {
  _config: Config<T>;

  constructor(config: Config<T>) {
    this._config = config;
  }

  /**
   * Derives a property from the given value.
   *
   * Uses its helper value deriver to derive the value of the
   * returned property.
   */
  deriveFrom(valueToDeriveFrom: T): DerivedProperty {
    return {
      name: this._config.propertyName,
      value: this._config.valueDeriver.deriveFrom(valueToDeriveFrom),
    };
  }
}
