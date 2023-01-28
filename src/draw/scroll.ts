import type { Drawing } from 'Draw/Drawing';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

export class DrawingWrapper {
  readonly wrappedDrawing: Drawing | StrictDrawing;

  constructor(drawing: Drawing | StrictDrawing) {
    this.wrappedDrawing = drawing;
  }

  get scrollLeft() {
    return this.wrappedDrawing.svgContainer.scrollLeft;
  }

  set scrollLeft(scrollLeft) {
    this.wrappedDrawing.svgContainer.scrollLeft = scrollLeft;
  }

  get scrollTop() {
    return this.wrappedDrawing.svgContainer.scrollTop;
  }

  set scrollTop(scrollTop) {
    this.wrappedDrawing.svgContainer.scrollTop = scrollTop;
  }

  get scrollWidth() {
    return this.wrappedDrawing.svgContainer.scrollWidth;
  }

  get scrollHeight() {
    return this.wrappedDrawing.svgContainer.scrollHeight;
  }
}
