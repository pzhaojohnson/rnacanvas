export interface MouseDownListener {
  (event: MouseEvent): void;
}

export interface WindowObject {
  /**
   * Not expected to return anything.
   */
  addEventListener(name: 'mousedown', listener: MouseDownListener): void | unknown;
}

export type MostRecentMouseDownTrackerCtorParams = {
  /**
   * The window object for the whole app.
   */
  window: WindowObject;
};

export class MostRecentMouseDownTracker {
  _mostRecentMouseDown?: MouseEvent;

  constructor(args: MostRecentMouseDownTrackerCtorParams) {
    args.window.addEventListener('mousedown', event => {
      this._mostRecentMouseDown = event;
    });
  }

  /**
   * Returns the most recent mouse down event to have occurred within
   * the window object provided to this most recent mouse down
   * tracker on construction.
   *
   * Returns undefined if there have not been any mouse down events
   * since this most recent mouse down tracker was created.
   */
  provide(): MouseEvent | undefined {
    return this._mostRecentMouseDown;
  }
}
