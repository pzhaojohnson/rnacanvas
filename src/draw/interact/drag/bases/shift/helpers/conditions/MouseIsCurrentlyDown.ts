export interface WindowObject {
  /**
   * Not expected to return anything.
   */
  addEventListener(name: 'mousedown' | 'mouseup', listener: () => void): void | unknown;
}

export type MouseIsCurrentlyDownCtorParams = {
  /**
   * The window object for the whole app.
   */
  window: WindowObject;
};

export class MouseIsCurrentlyDown {
  _isTrue = false;

  constructor(args: MouseIsCurrentlyDownCtorParams) {
    args.window.addEventListener('mousedown', () => {
      this._isTrue = true;
    });

    args.window.addEventListener('mouseup', () => {
      this._isTrue = false;
    });
  }

  /**
   * Returns true if the mouse is currently down and false otherwise.
   */
  isTrue(): boolean {
    return this._isTrue;
  }
}
