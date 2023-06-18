export interface Drawing {
  /**
   * The SVG document of the drawing.
   */
  readonly svg: unknown;

  /**
   * The immediate parent element containing the SVG document of the
   * drawing.
   *
   * Is assumed to possess the scroll bars that control the user's
   * view of the drawing.
   */
  readonly svgContainer: Element;
}

export interface ScrollBarCenterer {
  applyTo(ele: Element): void;
};

export type ConstructorArgs = {
  /**
   * Used to center the horizontal scroll bar of the drawing.
   */
  xScrollBarCenterer: ScrollBarCenterer;

  /**
   * Used to center the vertical scroll bar of the drawing.
   */
  yScrollBarCenterer: ScrollBarCenterer;
};

/**
 * Centers the user's view of the drawing on the center point of the
 * drawing.
 */
export class DrawingViewCenterer {
  readonly _xScrollBarCenterer: ScrollBarCenterer;
  readonly _yScrollBarCenterer: ScrollBarCenterer;

  constructor(args: ConstructorArgs) {
    let { xScrollBarCenterer, yScrollBarCenterer } = args;

    this._xScrollBarCenterer = xScrollBarCenterer;
    this._yScrollBarCenterer = yScrollBarCenterer;
  }

  applyTo(drawing: Drawing) {
    this._xScrollBarCenterer.applyTo(drawing.svgContainer);
    this._yScrollBarCenterer.applyTo(drawing.svgContainer);
  }
}
