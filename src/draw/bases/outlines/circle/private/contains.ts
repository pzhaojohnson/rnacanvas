import type { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(decoratee: CircleBaseOutline) {
    this.decoratee = decoratee;
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
