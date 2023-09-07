export interface ShouldRespondToMouseMoveDecider {
  /**
   * Returns true if mouse move events should be responded to
   * (i.e., the user is currently shifting bases by dragging them
   * with the mouse).
   *
   * Returns false otherwise.
   */
  decide(): boolean;
}

export interface GhostInteractionOverlayShiftCalculator {
  /**
   * Calculates what the shift of the ghost interaction overlay
   * should be (in client coordinates) relative to the interaction
   * overlay in response to the mouse move event.
   *
   * (The ghost interaction overlay is meant to convey to the user
   * in real-time the dragging of bases with the mouse.)
   */
  calculateFor(mouseMove: MouseEvent): { x: number, y: number };
}

export interface GhostInteractionOverlayShifter {
  /**
   * Sets the shift of the current ghost interaction overlay to the
   * specified client coordinates (relative to the actual interaction
   * overlay).
   */
  setShift(x: number, y: number): void;
}

export type MouseMoveHandlerCtorParams = {
  shouldRespondToMouseMoveDecider: ShouldRespondToMouseMoveDecider;

  ghostInteractionOverlayShiftCalculator: GhostInteractionOverlayShiftCalculator;

  ghostInteractionOverlayShifter: GhostInteractionOverlayShifter;
};

export class MouseMoveHandler {
  _shouldRespondToMouseMoveDecider: ShouldRespondToMouseMoveDecider;

  _ghostInteractionOverlayShiftCalculator: GhostInteractionOverlayShiftCalculator;

  _ghostInteractionOverlayShifter: GhostInteractionOverlayShifter;

  constructor(args: MouseMoveHandlerCtorParams) {
    this._shouldRespondToMouseMoveDecider = args.shouldRespondToMouseMoveDecider;

    this._ghostInteractionOverlayShiftCalculator = args.ghostInteractionOverlayShiftCalculator;

    this._ghostInteractionOverlayShifter = args.ghostInteractionOverlayShifter;
  }

  handle(mouseMove: MouseEvent) {
    if (!this._shouldRespondToMouseMoveDecider.decide()) {
      return;
    }

    let { x, y } = this._ghostInteractionOverlayShiftCalculator.calculateFor(mouseMove);

    this._ghostInteractionOverlayShifter.setShift(x, y);
  }
}
