import type { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

export class CircleBaseOutlineDecorator {
  decoratedCircleBaseOutline: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratedCircleBaseOutline = circleBaseOutline;
  }

  contains(node: SVG.Element | Node): boolean {
    if (node instanceof SVG.Element) {
      node = node.node;
    }

    // seems necessary on Node.js
    if (this.decoratedCircleBaseOutline.circle.node == node) {
      return true;
    }

    return this.decoratedCircleBaseOutline.circle.node.contains(node);
  }
}
