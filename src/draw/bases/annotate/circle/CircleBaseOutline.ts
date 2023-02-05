// the private circle base outline class
import { CircleBaseOutline as _CircleBaseOutline } from './private/CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

import * as Parent from './private/parent';

export type Point = {
  x: number;
  y: number;
};

export type AppendToMethodArgs = (
  Parameters<
    InstanceType<typeof Parent.CircleBaseOutlineDecorator>['appendTo']
  >
);

export class CircleBaseOutline {
  readonly underlyingCircleBaseOutline: _CircleBaseOutline;

  constructor(circle: SVG.Circle, baseCenter: Point) {
    this.underlyingCircleBaseOutline = (
      new _CircleBaseOutline({ circle, baseCenter })
    );
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
}
