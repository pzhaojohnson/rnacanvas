export interface App {
  drawingInteraction: {
    /**
     * The editing tool of the app.
     */
    editingTool: {
      /**
       * Should be set to the string "select" when bases are meant to
       * be selected when dragged over with the mouse.
       */
      readonly whenDraggingBases?: 'select' | unknown;
    }
  }
}

export type CtorParams = {
  /**
   * A reference to the whole app.
   */
  app: App;
};

export class EditingToolIsSetToSelectDraggedOverBases {
  _app: App;

  constructor(args: CtorParams) {
    this._app = args.app;
  }

  isTrue(): boolean {
    return this._app.drawingInteraction.editingTool.whenDraggingBases == 'select';
  }
}
