import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

export type NonNullObject = { [key: string]: unknown };

export class SchemaClassWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get name() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getStringProperty('name');
  }

  /**
   * The properties that correspond to element attributes (e.g., fill,
   * stroke, font-size).
   */
  get styleProperties(): NonNullObject {
    let styleProperties = {
      ...(new NonNullObjectWrapper(this.wrappee)).wrappee,
    };

    delete styleProperties.name;

    return styleProperties;
  }
}
