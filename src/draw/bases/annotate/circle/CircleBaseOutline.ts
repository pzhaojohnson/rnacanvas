// the private circle base outline class
import { CircleBaseOutline as _CircleBaseOutline } from './private/CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

import * as Parent from './private/parent';

import * as Contains from './private/contains';

export type Point = {
  x: number;
  y: number;
};

export type AppendToMethodArgs = (
  Parameters<
    InstanceType<typeof Parent.CircleBaseOutlineDecorator>['appendTo']
  >
);

export type ContainsMethodArgs = (
  Parameters<
    InstanceType<typeof Contains.CircleBaseOutlineDecorator>['contains']
  >
);

export class CircleBaseOutline {
  readonly underlyingCircleBaseOutline: _CircleBaseOutline;

  constructor(circle: SVG.Circle, baseCenter: Point) {
    this.underlyingCircleBaseOutline = (
      new _CircleBaseOutline({ circle, baseCenter })
    );
  }

  /**
   * A shorter alias for the underlying circle base outline.
   */
  get underlyingElement() {
    return this.underlyingCircleBaseOutline;
  }

  get circle() {
    return this.underlyingCircleBaseOutline.circle;
  }

  get parent() {
    return (
      new Parent.CircleBaseOutlineDecorator(this.underlyingCircleBaseOutline)
        .parent
    );
  }

  appendTo(...args: AppendToMethodArgs) {
    return (
      new Parent.CircleBaseOutlineDecorator(this.underlyingCircleBaseOutline)
        .appendTo(...args)
    );
  }

  remove() {
    return (
      new Parent.CircleBaseOutlineDecorator(this.underlyingCircleBaseOutline)
        .remove()
    );
  }

  contains(...args: ContainsMethodArgs) {
    return (
      new Contains.CircleBaseOutlineDecorator(this.underlyingElement)
        .contains(...args)
    );
  }
}
