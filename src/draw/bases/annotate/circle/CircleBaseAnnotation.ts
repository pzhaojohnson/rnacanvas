import * as SVG from '@svgdotjs/svg.js';
import { Point2D as Point } from 'Math/points/Point';
import { assignUuid } from 'Draw/svg/assignUuid';

export type Repositioning = {
  baseCenter?: Point;
}

export class CircleBaseAnnotation {
  readonly circle: SVG.Circle;

  _baseCenter: Point;

  constructor(circle: SVG.Circle, baseCenter: Point) {
    if (circle.type != 'circle') {
      throw new Error("Element isn't a circle.");
    }

    this.circle = circle;

    // use the attr method to check if an ID is initialized
    // since the id method itself will initialize an ID (to
    // a non-UUID)
    if (!this.circle.attr('id')) {
      assignUuid(this.circle);
    }

    this._baseCenter = { ...baseCenter };
  }

  contains(node: SVG.Element | Node): boolean {
    if (node instanceof SVG.Element) {
      node = node.node;
    }
    return this.circle.node == node || this.circle.node.contains(node);
  }

  reposition(rp?: Repositioning) {
    this.circle.attr({
      'cx': rp?.baseCenter?.x ?? this._baseCenter.x,
      'cy': rp?.baseCenter?.y ?? this._baseCenter.y,
    });
    if (rp?.baseCenter) {
      this._baseCenter = { ...rp.baseCenter };
    }
  }
}
