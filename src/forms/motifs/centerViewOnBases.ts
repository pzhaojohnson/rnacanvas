import type { StrictDrawing } from 'Draw/strict/StrictDrawing';
import type { Base } from 'Draw/bases/Base';
import { Point2D as Point } from 'Math/points/Point';
import { centroid } from '@rnacanvas/points';
import { displacement } from '@rnacanvas/points';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function centerOfRect(rect: Rect): Point {
  return {
    x: rect.x + (rect.width / 2),
    y: rect.y + (rect.height / 2),
  };
}

/**
 * Does nothing for an empty array of bases.
 */
export function centerViewOnBases(strictDrawing: StrictDrawing, bases: Base[]) {
  if (bases.length == 0) {
    return;
  }

  let textClientRects = bases.map(base => base.text.node.getBoundingClientRect());
  let textClientCenters = textClientRects.map(rect => centerOfRect(rect));
  let textClientCentroid = centroid(textClientCenters);

  let drawingClientRect = strictDrawing.drawing.svgContainer.getBoundingClientRect();
  let drawingClientCenter = centerOfRect(drawingClientRect);

  let shift = displacement(drawingClientCenter, textClientCentroid);
  strictDrawing.drawing.scroll.left += shift.x;
  strictDrawing.drawing.scroll.top += shift.y;
}
