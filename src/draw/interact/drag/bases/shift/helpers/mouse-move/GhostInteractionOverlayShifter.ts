export type InteractionOverlay = HTMLElement | SVGElement;

export interface InteractionOverlayGetter {
  /**
   * Returns the interaction overlay for the drawing of the app.
   */
  get(): InteractionOverlay;
}

export interface GhostInteractionOverlayProvider {
  /**
   * Provides the current ghost interaction overlay being used
   * to convey to the user when bases are being shifted by dragging.
   */
  provideCurrent(): InteractionOverlay;
}

export type CtorParams = {
  interactionOverlayGetter: InteractionOverlayGetter;

  ghostInteractionOverlayProvider: GhostInteractionOverlayProvider;
};

export class GhostInteractionOverlayShifter {
  _interactionOverlayGetter: InteractionOverlayGetter;

  _ghostInteractionOverlayProvider: GhostInteractionOverlayProvider;

  constructor(args: CtorParams) {
    this._interactionOverlayGetter = args.interactionOverlayGetter;

    this._ghostInteractionOverlayProvider = args.ghostInteractionOverlayProvider;
  }

  /**
   * Sets the shift (in client coordinates) of the ghost interaction
   * overlay relative to the interaction overlay.
   */
  setShift(x: number, y: number) {
    let interactionOverlay = this._interactionOverlayGetter.get();
    let boundingClientRect = interactionOverlay.getBoundingClientRect();

    let ghostInteractionOverlay = this._ghostInteractionOverlayProvider.provideCurrent();

    // might be safest to specify fixed positioning every time
    ghostInteractionOverlay.style.position = 'fixed';

    ghostInteractionOverlay.style.left = boundingClientRect.x + x + 'px';
    ghostInteractionOverlay.style.top = boundingClientRect.y + y + 'px';
  }
}
