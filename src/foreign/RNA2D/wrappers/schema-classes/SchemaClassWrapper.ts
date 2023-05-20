import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import * as SVG from '@svgdotjs/svg.js';

export class SchemaClassWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get name() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getStringProperty('name');
  }

  applyTo(ele: SVG.Element) {
    let attrs = {
      ...(new NonNullObjectWrapper(this.wrappee)).wrappee,
    };

    // don't apply the name of this schema class
    delete attrs.name;

    ele.attr(attrs);
  }
}
