import type { Drawing } from 'Draw/Drawing';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as Scroll from 'Draw/scroll';

export type Point = {
  x: number;
  y: number;
};

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

export class DrawingWrapper {
  readonly wrappedDrawing: Drawing | StrictDrawing;

  constructor(drawing: Drawing | StrictDrawing) {
    this.wrappedDrawing = drawing;
  }

  get scrollLeft() {
    return (
      (new Scroll.DrawingWrapper(this.wrappedDrawing))
        .scrollLeft
    );
  }

  set scrollLeft(scrollLeft) {
    (new Scroll.DrawingWrapper(this.wrappedDrawing))
      .scrollLeft = scrollLeft;
  }

  get scrollTop() {
    return (
      (new Scroll.DrawingWrapper(this.wrappedDrawing))
        .scrollTop
    );
  }

  set scrollTop(scrollTop) {
    (new Scroll.DrawingWrapper(this.wrappedDrawing))
      .scrollTop = scrollTop;
  }

  /**
   * The width of the view of the drawing.
   *
   * Currently returns the inner width of the window, which is not
   * totally accurate but seems to be close enough at the moment.
   */
  get viewWidth() {
    return window.innerWidth;
  }

  /**
   * The height of the view of the drawing.
   *
   * Currently returns the inner height of the window, which is not
   * totally accurate but seems to be close enough at the moment.
   */
  get viewHeight() {
    return window.innerHeight;
  }

  /**
   * The center point of the view of the drawing.
   *
   * If the view of the drawing is larger than the drawing itself, this
   * point can be outside of the drawing.
   */
  get centerOfView() {
    return {
      x: this.scrollLeft + (this.viewWidth / 2),
      y: this.scrollTop + (this.viewHeight / 2),
    };
  }

  set centerOfView(centerOfView) {
    this.scrollLeft = centerOfView.x - (this.viewWidth / 2);
    this.scrollTop = centerOfView.y - (this.viewHeight / 2);
  }
}
