import type { Drawing } from 'Draw/Drawing';
import { Point2D as Point } from 'Math/points/Point';

export function centerOfView(drawing: Drawing): Point {
  return {
    x: drawing.scroll.left + (window.innerWidth / 2),
    y: drawing.scroll.top + (window.innerHeight / 2),
  };
}

export function centerViewOn(drawing: Drawing, p: Point) {
  drawing.scroll.left = p.x - (window.innerWidth / 2);
  drawing.scroll.top = p.y - (window.innerHeight / 2);
}

// centers view on the center coordinates of the drawing
export function centerView(drawing: Drawing) {
  centerViewOn(drawing, {
    x: drawing.scroll.width / 2,
    y: drawing.scroll.height / 2,
  });
}
