import { direction } from '@rnacanvas/vectors';

// returns the angle that is the direction of a mouse movement
export function directionOfMousemove(event: MouseEvent): number {
  return direction({ x: event.movementX, y: event.movementY });
}
