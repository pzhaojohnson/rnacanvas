import type { StrictDrawing } from 'Draw/strict/StrictDrawing';
import { centerOfOutermostLoop } from './centerOfOutermostLoop';
import { direction } from '@rnacanvas/vectors';
import { displacement } from '@rnacanvas/points';
import { normalizeAngle } from 'Math/angles/normalizeAngle';

export function mousemoveIsClockwiseToOutermostLoop(strictDrawing: StrictDrawing, event: MouseEvent): boolean {
  let center = centerOfOutermostLoop(strictDrawing);
  let start = strictDrawing.drawing.svg.point(event.pageX, event.pageY);
  let movement = { x: event.movementX, y: event.movementY };

  let a1 = direction(displacement(center, start));
  let a2 = direction(movement);
  a2 = normalizeAngle(a2, a1);
  return a2 - a1 < Math.PI;
}
