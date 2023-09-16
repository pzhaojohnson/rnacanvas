export interface App<EditingTool> {
  drawingInteraction: {
    currentTool: EditingTool | unknown;

    editingTool: EditingTool;
  }
}

export type CurrentToolIsTheEditingToolCtorParams<EditingTool> = {
  /**
   * A reference to the whole app.
   */
  app: App<EditingTool>;
};

export class CurrentToolIsTheEditingTool<EditingTool> {
  _app: App<EditingTool>;

  constructor(args: CurrentToolIsTheEditingToolCtorParams<EditingTool>) {
    this._app = args.app;
  }

  /**
   * Returns true if the tool currently being used to interact with
   * the drawing of the app is the editing tool.
   *
   * Returns false otherwise.
   */
  isTrue(): boolean {
    let currentTool = this._app.drawingInteraction.currentTool;
    let editingTool = this._app.drawingInteraction.editingTool;
    return currentTool === editingTool;
  }
}
