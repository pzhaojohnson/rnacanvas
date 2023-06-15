export interface Indicator {
  indicate(): boolean;
}

export type ConstructorArgs = {
  /**
   * Indicators for all requirements that must be met for this
   * indicator to indicate true.
   */
  requirementsIndicators: Indicator[];
};

export class ShouldAskBeforeLeavingIndicator implements Indicator {
  readonly _requirementsIndicators: Indicator[];

  constructor(args: ConstructorArgs) {
    let { requirementsIndicators } = args;

    this._requirementsIndicators = requirementsIndicators;
  }

  /**
   * Returns true if all indicators for all requirements indicate true
   * and false otherwise.
   */
  indicate(): boolean {
    return this._requirementsIndicators.every(i => i.indicate());
  }
}
