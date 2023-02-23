/**
 * The private circle base outline class.
 */
import { CircleBaseOutline as _CircleBaseOutline } from './private/CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

import * as Parent from './private/parent';

import * as Contains from './private/contains';

import * as Reposition from './private/reposition';

import * as Z from './private/z';

import * as Save from './private/save';

export type Point = {
  x: number;
  y: number;
};

export class CircleBaseOutline {
  /**
   * Throws if the saved circle base outline is invalid.
   */
  static fromSaved(
    ...args: Parameters<typeof Save.CircleBaseOutlineDecorator.fromSaved>
  ) {
    return (
      Save.CircleBaseOutlineDecorator.fromSaved(...args)
    );
  }

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

  appendTo(
    ...args: Parameters<
      InstanceType<typeof Parent.CircleBaseOutlineDecorator>['appendTo']
    >
  ) {
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

  contains(
    ...args: Parameters<
      InstanceType<typeof Contains.CircleBaseOutlineDecorator>['contains']
    >
  ) {
    let decorator = new Contains.CircleBaseOutlineDecorator(
      this.underlyingCircleBaseOutline,
    );

    return decorator.contains(...args);
  }

  reposition(
    ...args: Parameters<
      InstanceType<typeof Reposition.CircleBaseOutlineDecorator>['reposition']
    >
  ) {
    let decorator = new Reposition.CircleBaseOutlineDecorator(
      this.underlyingCircleBaseOutline,
    );

    return decorator.reposition(...args);
  }

  sendToBack() {
    return (
      new Z.CircleBaseOutlineDecorator(this.underlyingCircleBaseOutline)
        .sendToBack()
    );
  }

  bringToFront() {
    return (
      new Z.CircleBaseOutlineDecorator(this.underlyingCircleBaseOutline)
        .bringToFront()
    );
  }

  toSaved() {
    return (
      new Save.CircleBaseOutlineDecorator(this.underlyingCircleBaseOutline)
        .toSaved()
    );
  }
}
