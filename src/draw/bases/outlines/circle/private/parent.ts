import type { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

export type Nullish = null | undefined;

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(decoratee: CircleBaseOutline) {
    this.decoratee = decoratee;
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
    if (!this.parent) {
      return;
    }

    this.decoratee.circle.remove();

    this.decoratee.eventListeners['remove']
      .forEach(listener => listener());
  }
}
