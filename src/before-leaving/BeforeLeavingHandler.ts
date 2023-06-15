export interface Indicator {
  indicate(): boolean;
}

export type ConstructorArgs = {
  /**
   * Used to determine if should prompt the user when handling before
   * unload events.
   */
  shouldAskBeforeLeaving: Indicator;

  /**
   * The message to display if should ask before leaving.
   */
  warningMessage: string;
};

export class BeforeLeavingHandler {
  readonly _shouldAskBeforeLeaving: Indicator;

  readonly _warningMessage: string;

  constructor(args: ConstructorArgs) {
    let { shouldAskBeforeLeaving, warningMessage } = args;

    this._shouldAskBeforeLeaving = shouldAskBeforeLeaving;
    this._warningMessage = warningMessage;
  }

  handle(event: BeforeUnloadEvent) {
    if (!this._shouldAskBeforeLeaving.indicate()) {
      // do nothing
      return;
    }

    // seems that it is safest to do both of these things
    // (for best cross-browser support)
    event.returnValue = this._warningMessage;
    return this._warningMessage;
  }
}
