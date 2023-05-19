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
}
