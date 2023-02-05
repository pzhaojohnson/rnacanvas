// the private circle base outline class
import { CircleBaseOutline as _CircleBaseOutline } from './private/CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

import * as Parent from './private/parent';

import * as Contains from './private/contains';

import * as Reposition from './private/reposition';

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

export type RepositionMethodArgs = (
  Parameters<
    InstanceType<typeof Reposition.CircleBaseOutlineDecorator>['reposition']
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

  contains(...args: ContainsMethodArgs) {
    let decorator = new Contains.CircleBaseOutlineDecorator(
      this.underlyingCircleBaseOutline,
    );

    return decorator.contains(...args);
  }

  reposition(...args: RepositionMethodArgs) {
    let decorator = new Reposition.CircleBaseOutlineDecorator(
      this.underlyingCircleBaseOutline,
    );

    return decorator.reposition(...args);
  }
}
