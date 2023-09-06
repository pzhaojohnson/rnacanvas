export interface MouseEventObject {
  clientX: number;
  clientY: number;
}

export interface MostRecentMouseDownTracker {
  /**
   * Provides the most recent mouse down event.
   *
   * (Returns undefined if there have not been any mouse down events.)
   */
  provide(): MouseEventObject | undefined;
}

export type CtorParams = {
  mostRecentMouseDownTracker: MostRecentMouseDownTracker;
};

export class GhostInteractionOverlayShiftCalculator {
  _mostRecentMouseDownTracker: MostRecentMouseDownTracker;

  constructor(args: CtorParams) {
    this._mostRecentMouseDownTracker = args.mostRecentMouseDownTracker;
  }

  /**
   * Calculates how much a ghost interaction overlay should be
   * shifted in response to a given mouse move event.
   */
  calculateFor(mouseMove: MouseEventObject): { x: number, y: number } {
    let mostRecentMouseDown = this._mostRecentMouseDownTracker.provide();

    if (!mostRecentMouseDown) {
      return { x: 0, y: 0 };
    }

    return {
      x: mouseMove.clientX - mostRecentMouseDown.clientX,
      y: mouseMove.clientY - mostRecentMouseDown.clientY,
    };
  }
}
