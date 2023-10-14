export interface Deriver<P, R> {
  deriveFrom(valueToDeriveFrom: P): R;
}

export type PropertyObject<N extends string, V> = {
  name: N;
  value: V;
}

export class PropertyObjectDeriver<N extends string, P, R> {
  _propertyName: N;

  _propertyValueDeriver: Deriver<P, R>;

  constructor(propertyName: N, propertyValueDeriver: Deriver<P, R>) {
    this._propertyName = propertyName;

    this._propertyValueDeriver = propertyValueDeriver;
  }

  /**
   * Derives a property object from the given value.
   *
   * Uses its helper property value deriver to derive the value of
   * the returned property object.
   */
  deriveFrom(valueToDeriveFrom: P): PropertyObject<N, R> {
    return {
      name: this._propertyName,
      value: this._propertyValueDeriver.deriveFrom(valueToDeriveFrom),
    };
  }
}
