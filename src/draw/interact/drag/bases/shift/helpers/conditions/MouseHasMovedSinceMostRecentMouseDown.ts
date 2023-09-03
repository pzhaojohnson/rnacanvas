export interface WindowObject {
  /**
   * Not expected to return anything.
   */
  addEventListener(name: 'mousedown' | 'mousemove', listener: () => void): void | unknown;
}

export type CtorParams = {
  /**
   * A reference to the window object for the whole app.
   */
  window: WindowObject;
};

export class MouseHasMovedSinceMostRecentMouseDown {
  _hasBeenAtLeastOneMouseDown = false;

  _mouseHasMovedSinceMostRecentMouseDown = false;

  constructor(args: CtorParams) {
    args.window.addEventListener('mousedown', () => {
      this._hasBeenAtLeastOneMouseDown = true;
      this._mouseHasMovedSinceMostRecentMouseDown = false;
    });

    args.window.addEventListener('mousemove', () => {
      this._mouseHasMovedSinceMostRecentMouseDown = true;
    });
  }

  isTrue(): boolean {
    return (
      this._hasBeenAtLeastOneMouseDown
      && this._mouseHasMovedSinceMostRecentMouseDown
    );
  }
}
