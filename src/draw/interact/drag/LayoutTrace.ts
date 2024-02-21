import { Point2D as Point } from 'Math/points/Point';
import * as SVG from '@svgdotjs/svg.js';
import { mean } from '@rnacanvas/math';

export type BaseCoordinates = {
  center: Point;
};

export type Layout = {
  baseCoordinates: BaseCoordinates[],

  // the dimensions of bases
  baseWidth: number;
  baseHeight: number;
};

export class LayoutTrace {

  // the underlying path elements of the layout trace
  readonly borderPath: SVG.Path;
  readonly fillPath: SVG.Path;

  constructor(layout: Layout) {
    this.borderPath = new SVG.Path();
    this.fillPath = new SVG.Path();

    this.borderPath.attr({
      'stroke': '#D4DEFF',
      'stroke-opacity': 1,
      'stroke-linejoin': 'round',
    });

    this.fillPath.attr({
      'stroke': 'white',
      'stroke-opacity': 1,
      'stroke-linejoin': 'round',
      'fill': 'white',
      'fill-opacity': 1,
    });

    this.retrace(layout);
  }

  appendTo(svg: SVG.Svg) {
    this.borderPath.addTo(svg);
    this.fillPath.addTo(svg);
  }

  remove() {
    this.fillPath.remove();
    this.borderPath.remove();
  }

  retrace(layout: Layout) {
    if (layout.baseCoordinates.length == 0) {
      return;
    }

    let baseSize = mean([layout.baseWidth, layout.baseHeight]);
    this.borderPath.attr('stroke-width', 2.33 * baseSize);
    this.fillPath.attr('stroke-width', 1.5 * baseSize);

    let c1 = layout.baseCoordinates[0].center;
    let d = `M ${c1.x} ${c1.y}`;

    for (let i = 1; i < layout.baseCoordinates.length; i++) {
      let ci = layout.baseCoordinates[i].center;
      d += `L ${ci.x} ${ci.y}`;
    }

    if (layout.baseCoordinates.length > 1) {
      d += 'z';
    }

    this.borderPath.plot(d);
    this.fillPath.plot(d);
  }
}
