import * as SVG from '@svgdotjs/svg.js';
import { interpretNumericValue } from 'Draw/svg/interpretNumericValue';

import { Point2D as Point } from 'Math/points/Point';
import { displacement2D as displacement } from 'Math/points/displacement';
import { direction } from '@rnacanvas/vectors';

type CircleSpecification = {
  center: Point;
  diameter: number;
};

function bboxOfCircle(spec: CircleSpecification): SVG.Box {
  return new SVG.Box(
    spec.center.x - (spec.diameter / 2),
    spec.center.y - (spec.diameter / 2),
    spec.diameter,
    spec.diameter,
  );
}

/**
 * Calculates the bounding box of a line more precisely
 * than the built-in bbox method, which does not seem
 * to account for stroke-width and stroke-linecap.
 */
export function bboxOfLine(line: SVG.Line): SVG.Box {
  let x1 = interpretNumericValue(line.attr('x1'))?.valueOf();
  let y1 = interpretNumericValue(line.attr('y1'))?.valueOf();
  let x2 = interpretNumericValue(line.attr('x2'))?.valueOf();
  let y2 = interpretNumericValue(line.attr('y2'))?.valueOf();
  let strokeWidth = interpretNumericValue(line.attr('stroke-width'))?.valueOf();
  let strokeLineCap = line.attr('stroke-linecap');

  // if any values could not be interpreted
  if (
    x1 == undefined
    || y1 == undefined
    || x2 == undefined
    || y2 == undefined
    || strokeWidth == undefined
  ) {
    // just return the bounding box calculated by the built-in bbox method
    return line.bbox();
  }

  let p1 = { x: x1, y: y1 };
  let p2 = { x: x2, y: y2 };

  // first calculate the bounding box of points 1 and 2
  let bbox = new SVG.Box(
    Math.min(x1, x2),
    Math.min(y1, y2),
    Math.max(x1, x2) - Math.min(x1, x2),
    Math.max(y1, y2) - Math.min(y1, y2),
  );

  // then expand the bounding box to account for the stroke-width
  let h = strokeWidth / 2;
  let angle = direction(displacement(p1, p2)) - (Math.PI / 2);
  bbox = new SVG.Box(
    bbox.x - Math.abs(h * Math.cos(angle)),
    bbox.y - Math.abs(h * Math.sin(angle)),
    bbox.width + Math.abs(2 * h * Math.cos(angle)),
    bbox.height + Math.abs(2 * h * Math.sin(angle)),
  );

  // then expand the bounding box again to account for
  // a square stroke-linecap if present
  if (strokeLineCap == 'square') {
    let h = strokeWidth / 2;
    let angle = direction(displacement(p1, p2));
    bbox = new SVG.Box(
      bbox.x - Math.abs(h * Math.cos(angle)),
      bbox.y - Math.abs(h * Math.sin(angle)),
      bbox.width + Math.abs(2 * h * Math.cos(angle)),
      bbox.height + Math.abs(2 * h * Math.sin(angle)),
    );
  }

  // also account for a round stroke-linecap if present
  if (strokeLineCap == 'round') {
    bbox = bbox.merge(bboxOfCircle({ center: p1, diameter: strokeWidth }));
    bbox = bbox.merge(bboxOfCircle({ center: p2, diameter: strokeWidth }));
  }

  return bbox;
}
