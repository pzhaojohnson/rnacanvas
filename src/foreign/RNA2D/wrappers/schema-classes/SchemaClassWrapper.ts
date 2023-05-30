import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import * as SVG from '@svgdotjs/svg.js';

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

  applyTo(ele: SVG.Element) {
    let attrs = {
      ...(new NonNullObjectWrapper(this.wrappee)).wrappee,
    };

    // don't apply the name of this schema class
    delete attrs.name;

    ele.attr(attrs);
  }
}
