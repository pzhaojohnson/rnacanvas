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

export type Helpers<T> = {
  propertyDerivers: PropertyDeriver<T>[];
};

export class ObjectDeriver<T> {
  _helpers: Helpers<T>;

  constructor(helpers: Helpers<T>) {
    this._helpers = helpers;
  }

  /**
   * Derives an object from the given value.
   *
   * Fills in the object with the properties derived by its helper
   * property derivers.
   */
  deriveFrom(valueToDeriveFrom: T): DerivedObject {
    let derivedObject: DerivedObject = {};

    this._helpers.propertyDerivers.forEach(propertyDeriver => {
      let derivedProperty = propertyDeriver.deriveFrom(valueToDeriveFrom);
      derivedObject[derivedProperty.name] = derivedProperty.value;
    });

    return derivedObject;
  }
}
