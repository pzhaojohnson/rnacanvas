import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { SchemaClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

export class SchemaWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get classes() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('classes')
      .map(c => new SchemaClassWrapper(c));
  }
}
