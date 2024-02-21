import { Point2D as Point } from 'Math/points/Point';
import * as SVG from '@svgdotjs/svg.js';
import { mean } from '@rnacanvas/math';

export type BaseCoordinates = {
  center: Point;
};

export type Layout = {
  // coordinates for every base
  baseCoordinates: BaseCoordinates[];

  // the dimensions of bases
  baseWidth: number;
  baseHeight: number;
};

export class DraggedHighlighting {

  // the positions in the layout that are being dragged
  // (will be traced in the order they are present in this array)
  // (should contain at least two positions)
  readonly draggedPositions: number[];

  // the underlying path elements
  readonly borderPath: SVG.Path;
  readonly fillPath: SVG.Path;

  constructor(draggedPositions: number[], layout: Layout) {
    this.draggedPositions = draggedPositions;

    this.borderPath = new SVG.Path();
    this.fillPath = new SVG.Path();

    this.borderPath.attr({
      'stroke': '#89A2EE',
      'stroke-opacity': 1,
      'stroke-linejoin': 'round',
      'fill': '#89A2EE',
      'fill-opacity': 1,
    });

    this.fillPath.attr({
      'stroke': 'white',
      'stroke-opacity': 1,
      'stroke-linejoin': 'round',
      'fill': 'white',
      'fill-opacity': 1,
    });

    this.refit(layout);
  }

  appendTo(svg: SVG.Svg) {
    this.borderPath.addTo(svg);
    this.fillPath.addTo(svg);
  }

  remove() {
    this.fillPath.remove();
    this.borderPath.remove();
  }

  refit(layout: Layout) {
    let baseSize = mean([layout.baseWidth, layout.baseHeight]);
    this.borderPath.attr('stroke-width', 2.33 * baseSize);
    this.fillPath.attr('stroke-width', 1.33 * baseSize);

    let draggedBaseCoordinates: BaseCoordinates[] = [];
    this.draggedPositions.forEach(p => {
      let bcs: BaseCoordinates | undefined = layout.baseCoordinates[p - 1];
      if (bcs) {
        draggedBaseCoordinates.push(bcs);
      }
    });

    if (draggedBaseCoordinates.length > 0) {
      let d = '';

      let c1 = draggedBaseCoordinates[0].center;
      d += `M ${c1.x} ${c1.y}`;

      for (let i = 1; i < draggedBaseCoordinates.length; i++) {
        let ci = draggedBaseCoordinates[i].center;
        d += `L ${ci.x} ${ci.y}`;
      }

      if (draggedBaseCoordinates.length > 1) {
        d += 'z';
      }

      this.borderPath.plot(d);
      this.fillPath.plot(d);
    }
  }
}
