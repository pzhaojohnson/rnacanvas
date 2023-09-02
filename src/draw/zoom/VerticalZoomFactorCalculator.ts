export interface Drawing {
  /**
   * The SVG document of the drawing.
   */
  svg: {
    viewbox(): {
      height: number;
    }

    /**
     * The underlying DOM node of the SVG document.
     */
    node: {
      getBoundingClientRect(): {
        height: number;
      }
    }
  }
}

export type VerticalZoomFactorCalculatorCtorParams = {
  /**
   * The drawing to calculate the vertical zoom factor of.
   */
  drawing: Drawing;
};

export class VerticalZoomFactorCalculator {
  _drawing: Drawing;

  constructor(args: VerticalZoomFactorCalculatorCtorParams) {
    this._drawing = args.drawing;
  }

  /**
   * Divides the client height of the drawing SVG document by its
   * view box height.
   *
   * May return a nonfinite value since this method performs a
   * division operation.
   */
  calculate(): number {
    let clientHeight = this._drawing.svg.node.getBoundingClientRect().height;

    let viewBoxHeight = this._drawing.svg.viewbox().height;

    return clientHeight / viewBoxHeight;
  }
}
