import type { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

export type Nullish = null | undefined;

export class CircleBaseOutlineDecorator {
  decoratedCircleBaseOutline: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratedCircleBaseOutline = circleBaseOutline;
  }

  /**
   * Returns a nullish value if the circle base outline is not contained
   * in an SVG document.
   */
  get parent(): SVG.Svg | Nullish {
    return this.decoratedCircleBaseOutline.circle.root();
  }

  appendTo(svg: SVG.Svg) {
    this.decoratedCircleBaseOutline.circle.addTo(svg);
  }

  remove() {
    this.decoratedCircleBaseOutline.circle.remove();
  }
}
