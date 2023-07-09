export interface App {
  /**
   * Refreshes the app.
   */
  refresh: () => void;
}

export type ConstructorArgs = {
  /**
   * The app instance to be refreshed.
   */
  app: App;
};

export class AppRefresher {
  readonly _app: App;

  constructor(args: ConstructorArgs) {
    let { app } = args;

    this._app = app;
  }

  /**
   * Refreshes the app for this app refresher instance.
   */
  refresh() {
    this._app.refresh();
  }
}
