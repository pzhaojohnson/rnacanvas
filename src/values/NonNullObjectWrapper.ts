import { NonNullObject } from 'Values/isNonNullObject';

import { isNonNullObject } from 'Values/isNonNullObject';

export class NonNullObjectWrapper {
  wrappee: NonNullObject;

  constructor(wrappee: unknown) {
    if (!isNonNullObject(wrappee)) {
      throw new Error(`${wrappee} is not a non-null object.`);
    }

    this.wrappee = wrappee;
  }

  /**
   * Returns undefined if the property does not exist (as objects
   * generally do in JavaScript).
   */
  getProperty(name: string): unknown {
    return this.wrappee[name];
  }

  /**
   * Throws if the property is not a string.
   */
  getStringProperty(name: string): string | never {
    let value = this.getProperty(name);

    if (typeof value != 'string') {
      throw new Error(`${value} is not a string.`);
    }

    return value;
  }

  /**
   * Throws if the property is not a number.
   */
  getNumberProperty(name: string): number | never {
    let value = this.getProperty(name);

    if (typeof value != 'number') {
      throw new Error(`${value} is not a number.`);
    }

    return value;
  }

  /**
   * Throws if the property is not a finite number.
   */
  getFiniteNumberProperty(name: string): number | never {
    let value = this.getNumberProperty(name);

    if (!Number.isFinite(value)) {
      throw new Error(`${value} is not finite.`);
    }

    return value;
  }

  /**
   * Throws if the property is not an array.
   */
  getArrayProperty(name: string): unknown[] | never {
    let value = this.getProperty(name);

    if (!Array.isArray(value)) {
      throw new Error(`${value} is not an array.`);
    }

    return value;
  }
}
