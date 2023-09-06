export type InteractionOverlay = HTMLElement | SVGElement;

export interface InteractionOverlayGetter {
  /**
   * Returns the interaction overlay for the drawing of the app.
   */
  get(): InteractionOverlay;
}

export interface InteractionOverlayGhoster {
  /**
   * Creates a ghost of the interaction overlay that can be dragged
   * around as the user drags bases around with the mouse.
   */
  ghost(interactionOverlay: InteractionOverlay): InteractionOverlay;
}

export interface WindowObject {
  addEventListener(name: 'mouseup', listener: () => void): void;
}

export type GhostInteractionOverlayProviderCtorParams = {
  interactionOverlayGetter: InteractionOverlayGetter;

  interactionOverlayGhoster: InteractionOverlayGhoster;

  /**
   * The window object for the whole app.
   */
  window: WindowObject;
};

export class GhostInteractionOverlayProvider {
  _interactionOverlayGetter: InteractionOverlayGetter;

  _interactionOverlayGhoster: InteractionOverlayGhoster;

  /**
   * The current ghost interaction overlay.
   */
  _ghostInteractionOverlay?: InteractionOverlay;

  constructor(args: GhostInteractionOverlayProviderCtorParams) {
    this._interactionOverlayGetter = args.interactionOverlayGetter;

    this._interactionOverlayGhoster = args.interactionOverlayGhoster;

    args.window.addEventListener('mouseup', () => {
      if (this._ghostInteractionOverlay) {
        this._ghostInteractionOverlay.remove();
        this._ghostInteractionOverlay = undefined;
      }
    });
  }

  /**
   * Provides the current ghost interaction overlay that can be
   * dragged around as the user drags bases around with the mouse.
   *
   * The provided ghost interaction overlay is automatically removed
   * from the document on the next mouse up event.
   */
  provideCurrent(): InteractionOverlay {
    if (!this._ghostInteractionOverlay) {
      let interactionOverlay = this._interactionOverlayGetter.get();
      this._ghostInteractionOverlay = this._interactionOverlayGhoster.ghost(interactionOverlay);
    }

    return this._ghostInteractionOverlay;
  }
}
