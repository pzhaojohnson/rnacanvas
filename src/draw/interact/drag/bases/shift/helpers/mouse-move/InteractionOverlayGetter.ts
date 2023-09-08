export type InteractionOverlay = HTMLElement | SVGElement;

export interface App {
  drawingInteraction: {
    drawingOverlay: {
      svg: {
        /**
         * The actual DOM node of the drawing overlay SVG element
         * (i.e., the interaction overlay).
         */
        node: InteractionOverlay;
      }
    }
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
  get(): InteractionOverlay {
    return this._app.drawingInteraction.drawingOverlay.svg.node;
  }
}
