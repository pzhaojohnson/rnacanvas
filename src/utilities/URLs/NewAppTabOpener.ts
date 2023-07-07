export interface NewTabOpener {
  /**
   * Opens a new tab at the specified URL.
   *
   * Not expected to return anything.
   */
  open(url: string): void | unknown;
}

export interface BaseAppURLProvider {
  /**
   * Provides the base URL of the app (i.e., with no search parameters
   * or other things that might modulate the initial default behavior
   * of the app).
   */
  provide(): string;
}

export type ConstructorArgs = {
  newTabOpener: NewTabOpener;

  baseAppURLProvider: BaseAppURLProvider;
};

export class NewAppTabOpener {
  readonly _newTabOpener: NewTabOpener;

  readonly _baseAppURLProvider: BaseAppURLProvider;

  constructor(args: ConstructorArgs) {
    let { newTabOpener, baseAppURLProvider } = args;

    this._newTabOpener = newTabOpener;

    this._baseAppURLProvider = baseAppURLProvider;
  }

  /**
   * Opens a new tab of the app with no search parameters or any other
   * things that might modulate the initial default behavior of the
   * app.
   */
  openANewTabOfTheApp() {
    this._newTabOpener.open(
      this._baseAppURLProvider.provide()
    );
  }
}
