export interface MouseEventObject {
  clientX: number;
  clientY: number;
}

export interface MostRecentMouseDownTracker {
  /**
   * Returns the most recent mouse down event (or undefined if there
   * have not been any mouse down events tracked).
   */
  provide(): MouseEventObject | undefined;
}

export interface ZoomFactorCalculator {
  /**
   * Returns a zoom factor for the relevant drawing (either the
   * horizontal or vertical zoom factor).
   */
  calculate(): number;
}

export type Shift = {
  x: number;
  y: number;
};

export type BasesShiftCalculatorCtorParams = {
  mostRecentMouseDownTracker: MostRecentMouseDownTracker;

  /**
   * Used to adjust how much to shift bases horizontally.
   */
  horizontalZoomFactorCalculator: ZoomFactorCalculator;

  /**
   * Used to adjust how much to shift bases vertically.
   */
  verticalZoomFactorCalculator: ZoomFactorCalculator;
};

export class BasesShiftCalculator {
  _mostRecentMouseDownTracker: MostRecentMouseDownTracker;

  _horizontalZoomFactorCalculator: ZoomFactorCalculator;

  _verticalZoomFactorCalculator: ZoomFactorCalculator;

  constructor(args: BasesShiftCalculatorCtorParams) {
    this._mostRecentMouseDownTracker = args.mostRecentMouseDownTracker;

    this._horizontalZoomFactorCalculator = args.horizontalZoomFactorCalculator;

    this._verticalZoomFactorCalculator = args.verticalZoomFactorCalculator;
  }

  /**
   * Calculates how much selected bases should be shifted in response
   * to the given mouse up event.
   */
  calculateFor(mouseUp: MouseEvent): Shift {
    let mouseDown = this._mostRecentMouseDownTracker.provide();

    if (!mouseDown) {
      return { x: 0, y: 0 };
    }

    let x = mouseUp.clientX - mouseDown.clientX;
    let y = mouseUp.clientY - mouseDown.clientY;

    x /= this._horizontalZoomFactorCalculator.calculate();
    y /= this._verticalZoomFactorCalculator.calculate();

    return { x, y };
  }
}
