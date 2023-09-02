export interface Drawing {
  /**
   * The SVG document of the drawing.
   */
  svg: {
    viewbox(): {
      width: number;
    };

    /**
     * The underlying DOM node of the SVG document.
     */
    node: {
      getBoundingClientRect(): {
        width: number;
      }
    }
  }
}

export type HorizontalZoomFactorCalculatorCtorParams = {
  /**
   * The drawing to calculate the horizontal zoom factor of.
   */
  drawing: Drawing;
};

export class HorizontalZoomFactorCalculator {
  _drawing: Drawing;

  constructor(args: HorizontalZoomFactorCalculatorCtorParams) {
    this._drawing = args.drawing;
  }

  /**
   * Divides the client width of the drawing SVG document by its
   * view box width.
   *
   * May return a nonfinite value since this method performs a
   * division operation.
   */
  calculate(): number {
    let clientWidth = this._drawing.svg.node.getBoundingClientRect().width;
    let viewBoxWidth = this._drawing.svg.viewbox().width;
    return clientWidth / viewBoxWidth;
  }
}
