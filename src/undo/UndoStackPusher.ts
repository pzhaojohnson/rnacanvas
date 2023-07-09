export interface App {
  /**
   * Pushes the undo stack of the app.
   */
  pushUndo: () => void;
}

export type ConstructorArgs = {
  /**
   * The app to push the undo stack for.
   */
  app: App;
};

export class UndoStackPusher {
  readonly _app: App;

  constructor(args: ConstructorArgs) {
    let { app } = args;

    this._app = app;
  }

  /**
   * Pushes the undo stack of the app instance for this undo stack
   * pusher.
   */
  push() {
    this._app.pushUndo();
  }
}
