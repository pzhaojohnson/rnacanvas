export interface App<Drawing> {
  /**
   * The drawing of the app instance.
   */
  drawing: Drawing;
}

/**
 * Gets the drawing of a target app instance.
 */
export class DrawingGetter<Drawing> {
  _targetApp: App<Drawing>;

  constructor(targetApp: App<Drawing>) {
    this._targetApp = targetApp;
  }

  get(): Drawing {
    return this._targetApp.drawing;
  }
}
