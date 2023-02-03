import type { Drawing } from 'Draw/Drawing';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as Scroll from 'Draw/scroll';

import * as CenterPoint from 'Draw/centerPoint';

type Rect = {
  /**
   * Leftmost coordinate.
   */
  left: number;

  /**
   * Topmost coordinate.
   */
  top: number;

  width: number;
  height: number;
};

class RectWrapper {
  readonly wrappedRect: Rect;

  constructor(rect: Rect) {
    this.wrappedRect = rect;
  }

  get left() {
    return this.wrappedRect.left;
  }

  get top() {
    return this.wrappedRect.top;
  }

  get width() {
    return this.wrappedRect.width;
  }

  get height() {
    return this.wrappedRect.height;
  }

  get center() {
    return {
      x: this.left + (this.width / 2),
      y: this.top + (this.height / 2),
    };
  }
}

export class DrawingWrapper {
  readonly wrappedDrawing: Drawing | StrictDrawing;

  constructor(drawing: Drawing | StrictDrawing) {
    this.wrappedDrawing = drawing;
  }

  get svg() {
    return this.wrappedDrawing.svg;
  }

  get svgContainer() {
    return this.wrappedDrawing.svgContainer;
  }

  get centerPoint() {
    return (
      (new CenterPoint.DrawingWrapper(this.wrappedDrawing))
        .centerPoint
    );
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
   * Centers the view of the drawing on the center point of the drawing.
   */
  centerView() {
    // just in case something throws
    try {
      let drawingClientRect = new RectWrapper(
        this.svg.node.getBoundingClientRect()
      );

      let viewClientRect = new RectWrapper(
        this.svgContainer.getBoundingClientRect()
      );

      let drawingClientCenter = drawingClientRect.center;
      let viewClientCenter = viewClientRect.center;

      this.scrollLeft += drawingClientCenter.x - viewClientCenter.x;
      this.scrollTop += drawingClientCenter.y - viewClientCenter.y;
    } catch (error) {
      console.error(error);
      console.error('Unable to center the view of the drawing.');
    }
  }
}
