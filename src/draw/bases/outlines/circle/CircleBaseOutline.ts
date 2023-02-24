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

  /**
   * Instances of this class wrap an instance of the private circle base
   * outline class.
   */
  readonly _wrappee: _CircleBaseOutline;

  constructor(circle: SVG.Circle, baseCenter: Point) {
    this._wrappee = (
      new _CircleBaseOutline({ circle, baseCenter })
    );
  }

  get circle() {
    return this._wrappee.circle;
  }

  get parent() {
    return (
      new Parent.CircleBaseOutlineDecorator(this._wrappee)
        .parent
    );
  }

  appendTo(
    ...args: Parameters<
      InstanceType<typeof Parent.CircleBaseOutlineDecorator>['appendTo']
    >
  ) {
    return (
      new Parent.CircleBaseOutlineDecorator(this._wrappee)
        .appendTo(...args)
    );
  }

  remove() {
    return (
      new Parent.CircleBaseOutlineDecorator(this._wrappee)
        .remove()
    );
  }

  contains(
    ...args: Parameters<
      InstanceType<typeof Contains.CircleBaseOutlineDecorator>['contains']
    >
  ) {
    let decorator = new Contains.CircleBaseOutlineDecorator(
      this._wrappee,
    );

    return decorator.contains(...args);
  }

  reposition(
    ...args: Parameters<
      InstanceType<typeof Reposition.CircleBaseOutlineDecorator>['reposition']
    >
  ) {
    let decorator = new Reposition.CircleBaseOutlineDecorator(
      this._wrappee,
    );

    return decorator.reposition(...args);
  }

  sendToBack() {
    return (
      new Z.CircleBaseOutlineDecorator(this._wrappee)
        .sendToBack()
    );
  }

  bringToFront() {
    return (
      new Z.CircleBaseOutlineDecorator(this._wrappee)
        .bringToFront()
    );
  }

  toSaved() {
    return (
      new Save.CircleBaseOutlineDecorator(this._wrappee)
        .toSaved()
    );
  }
}
