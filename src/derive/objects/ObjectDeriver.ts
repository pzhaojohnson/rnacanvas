export interface DerivedProperty {
  name: string;
  value: unknown;
}

export interface PropertyDeriver<T> {
  /**
   * Derives a property from a given value.
   */
  deriveFrom(valueToDeriveFrom: T): DerivedProperty;
}

export type DerivedObject = { [propertyName: string]: unknown };

export class ObjectDeriver<T> {
  _propertyDerivers: PropertyDeriver<T>[];

  constructor(propertyDerivers: PropertyDeriver<T>[]) {
    this._propertyDerivers = propertyDerivers;
  }

  /**
   * Derives an object from the given value.
   *
   * Fills in the object with the properties derived by its helper
   * property derivers.
   */
  deriveFrom(valueToDeriveFrom: T): DerivedObject {
    let derivedObject: DerivedObject = {};

    this._propertyDerivers.forEach(propertyDeriver => {
      let derivedProperty = propertyDeriver.deriveFrom(valueToDeriveFrom);
      derivedObject[derivedProperty.name] = derivedProperty.value;
    });

    return derivedObject;
  }
}
