export interface ValueDeriver<T1, T2> {
  /**
   * Derives a value from another value.
   */
  deriveFrom(value: T1): T2;
}

export interface PropertyDeriver<T> {
  /**
   * The name of the property to assign to.
   */
  propertyName: string;

  /**
   * Derives the value of the property.
   */
  valueDeriver: ValueDeriver<T, unknown>;
}

export type DerivedObject = { [propertyName: string]: unknown };

export class ObjectDeriver<T> {
  _propertyDerivers: PropertyDeriver<T>[];

  constructor(propertyDerivers: PropertyDeriver<T>[]) {
    this._propertyDerivers = propertyDerivers;
  }

  /**
   * Returns an object with all the properties derived by the helper
   * property derivers.
   */
  deriveFrom(value: T): DerivedObject {
    let derivedObject: DerivedObject = {};

    this._propertyDerivers.forEach(propertyDeriver => {
      let derivedValue = propertyDeriver.valueDeriver.deriveFrom(value);
      derivedObject[propertyDeriver.propertyName] = derivedValue;
    });

    return derivedObject;
  }
}
