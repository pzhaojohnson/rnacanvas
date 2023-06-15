export interface App {
  settings: {
    askBeforeLeaving: unknown;
  };
}

export type ConstructorArgs = {
  app: App;
};

export class AskBeforeLeavingSettingIsToggledIndicator {
  readonly _app: App;

  constructor(args: ConstructorArgs) {
    let { app } = args;

    this._app = app;
  }

  /**
   * Returns true if the ask before leaving setting of the app is
   * currently toggled and false otherwise.
   */
  indicate(): boolean {
    return Boolean(this._app.settings.askBeforeLeaving);
  }
}
