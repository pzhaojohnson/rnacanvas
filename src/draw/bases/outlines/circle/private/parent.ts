import type { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

export type Nullish = null | undefined;

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratee = circleBaseOutline;
  }

  /**
   * Returns a nullish value if the circle base outline is not contained
   * in an SVG document.
   */
  get parent(): SVG.Svg | Nullish {
    return this.decoratee.circle.root();
  }

  appendTo(svg: SVG.Svg) {
    this.decoratee.circle.addTo(svg);
  }

  remove() {
    this.decoratee.circle.remove();
  }
}
