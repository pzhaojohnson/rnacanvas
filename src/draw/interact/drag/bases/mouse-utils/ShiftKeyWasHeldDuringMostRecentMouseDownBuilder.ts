import { ShiftKeyWasHeldDuringMostRecentMouseDown } from './ShiftKeyWasHeldDuringMostRecentMouseDown';

import { MostRecentMouseDownTracker } from './MostRecentMouseDownTracker';

export class ShiftKeyWasHeldDuringMostRecentMouseDownBuilder {
  /**
   * Builds a condition that is true if the Shift key was held during the most recent mouse down event
   * for the provided window.
   */
  buildFor(window: Window): ShiftKeyWasHeldDuringMostRecentMouseDown {
    let mostRecentMouseDownTracker = new MostRecentMouseDownTracker({ window });

    return new ShiftKeyWasHeldDuringMostRecentMouseDown({
      mostRecentMouseDownTracker,
    });
  }
}
