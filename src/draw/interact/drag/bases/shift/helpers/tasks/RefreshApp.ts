export interface AppRefresher {
  /**
   * Refreshes the relevant app.
   */
  refresh(): void;
}

export type RefreshAppConstructorParameters = {
  /**
   * To be used to refresh the relevant app.
   */
  appRefresher: AppRefresher;
};

/**
 * Represents the task of refreshing the app (such as after editing
 * the structure drawing of the app).
 */
export class RefreshApp {
  _appRefresher: AppRefresher;

  constructor(args: RefreshAppConstructorParameters) {
    this._appRefresher = args.appRefresher;
  }

  do() {
    this._appRefresher.refresh();
  }
}
