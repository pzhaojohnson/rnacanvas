import type { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratee = circleBaseOutline;
  }

  contains(node: SVG.Element | Node): boolean {
    if (node instanceof SVG.Element) {
      node = node.node;
    }

    // seems necessary on Node.js
    if (this.decoratee.circle.node == node) {
      return true;
    }

    return this.decoratee.circle.node.contains(node);
  }
}
