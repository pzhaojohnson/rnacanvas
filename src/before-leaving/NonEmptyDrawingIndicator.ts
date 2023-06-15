export interface App {
  drawing: {
    isEmpty(): unknown;
  };
}

export type ConstructorArgs = {
  app: App;
};

export class NonEmptyDrawingIndicator {
  readonly _app: App;

  constructor(args: ConstructorArgs) {
    let { app } = args;

    this._app = app;
  }

  /**
   * Returns true if the drawing of the app is currently nonempty and
   * false otherwise.
   */
  indicate(): boolean {
    return !Boolean(this._app.drawing.isEmpty());
  }
}
