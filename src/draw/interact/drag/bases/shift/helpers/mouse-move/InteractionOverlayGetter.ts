export interface App {
  drawingInteraction: {
    drawingOverlay: Element;
  }
}

export type InteractionOverlayGetterCtorParams = {
  /**
   * A reference to the whole app.
   */
  app: App;
};

export class InteractionOverlayGetter {
  _app: App;

  constructor(args: InteractionOverlayGetterCtorParams) {
    this._app = args.app;
  }

  /**
   * Returns the element that is overlaid over the drawing of the app
   * and that contains all the indicators to the user of what
   * elements of the drawing are currently being interacted with
   * (e.g., what is currently selected and hovered).
   */
  get(): Element {
    return this._app.drawingInteraction.drawingOverlay;
  }
}
