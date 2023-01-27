import type { Drawing } from 'Draw/Drawing';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

export type Point = {
  x: number;
  y: number;
};

export class DrawingWrapper {
  /**
   * The wrapped drawing.
   */
  readonly drawing: Drawing | StrictDrawing;

  constructor(drawing: Drawing | StrictDrawing) {
    this.drawing = drawing;
  }

  /**
   * The center point of the drawing.
   *
   * Is purely determined by the view box of the SVG document of the
   * drawing.
   *
   * (Is not affected by zoom and is distinct from the center point of
   * the user's view of the drawing.)
   */
  get centerPoint(): Point {
    let viewbox = this.drawing.svg.viewbox();

    return {
      x: viewbox.x + (viewbox.width / 2),
      y: viewbox.y + (viewbox.height / 2),
    };
  }
}
