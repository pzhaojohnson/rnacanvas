// the private circle base outline class
import { CircleBaseOutline as _CircleBaseOutline } from './private/CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

export type Point = {
  x: number;
  y: number;
};

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
}
