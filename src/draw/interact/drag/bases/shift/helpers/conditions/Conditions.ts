export interface Condition {
  isTrue(): boolean;
}

export type ConditionsCtorParams = {
  /**
   * The conditions to encapsulate.
   */
  conditions: Condition[];
};

export class Conditions {
  _conditions: Condition[];

  constructor(args: ConditionsCtorParams) {
    this._conditions = args.conditions;
  }

  /**
   * Returns true if all the encapsulated conditions are true.
   */
  allAreTrue(): boolean {
    return this._conditions.every(c => c.isTrue());
  }
}
