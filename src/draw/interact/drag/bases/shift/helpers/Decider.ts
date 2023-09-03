export interface Conditions {
  /**
   * Returns true if all the encapsulated conditions are true
   * and false otherwise.
   */
  allAreTrue(): boolean;
}

export type DeciderCtorParams = {
  /**
   * The conditions that must be met.
   */
  conditions: Conditions;
};

export class Decider {
  _conditions: Conditions;

  constructor(args: DeciderCtorParams) {
    this._conditions = args.conditions;
  }

  /**
   * Returns true if all the conditions provided to this decider
   * on construction are true.
   *
   * Returns false otherwise.
   */
  decide(): boolean {
    return this._conditions.allAreTrue();
  }
}
