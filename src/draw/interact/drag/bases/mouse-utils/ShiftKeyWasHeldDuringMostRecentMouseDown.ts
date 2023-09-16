export interface MostRecentMouseDownTracker {
  /**
   * Returns the most recent mouse down event (or undefined if there
   * have not been any mouse down events).
   */
  provide(): MouseEvent | undefined;
}

export type Helpers = {
  mostRecentMouseDownTracker: MostRecentMouseDownTracker;
};

export class ShiftKeyWasHeldDuringMostRecentMouseDown {
  _helpers: Helpers;

  constructor(helpers: Helpers) {
    this._helpers = helpers;
  }

  /**
   * Returns true if the Shift key was being held down during the
   * most recent mouse down event.
   *
   * Returns false otherwise (and if there have not been any mouse
   * down events).
   */
  isTrue(): boolean {
    let mostRecentMouseDown = this._helpers.mostRecentMouseDownTracker.provide();

    if (!mostRecentMouseDown) {
      return false;
    }

    // explicitly return boolean values
    // (in case shiftKey property could be any truthy or falsy value)
    return mostRecentMouseDown.shiftKey ? true : false;
  }
}
