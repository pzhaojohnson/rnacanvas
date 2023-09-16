export interface App<Base> {
  drawingInteraction: {
    /**
     * The editing tool of the app.
     */
    editingTool: {
      isSelected(b: Base): boolean;
    }
  }
}

export type BaseIsSelectedCheckerCtorParams<Base> = {
  /**
   * A reference to the whole app.
   */
  app: App<Base>;
};

export class BaseIsSelectedChecker<Base> {
  _app: App<Base>;

  constructor(args: BaseIsSelectedCheckerCtorParams<Base>) {
    this._app = args.app;
  }

  /**
   * Returns true if the base is currently selected by the editing
   * tool of the app and false otherwise.
   */
  check(b: Base): boolean {
    return this._app.drawingInteraction.editingTool.isSelected(b);
  }
}
