export interface Condition {
  isTrue(): boolean;
}

export class SomeConditionsAreTrue implements Condition {
  _conditionsToReportOn: Condition[];

  constructor(conditionsToReportOn: Condition[]) {
    this._conditionsToReportOn = conditionsToReportOn;
  }

  /**
   * Returns true if at least one of the conditions to report on are
   * true.
   *
   * Returns false otherwise.
   *
   * (Returns false if the conditions to report on is an empty array.)
   */
  isTrue(): boolean {
    return this._conditionsToReportOn.some(c => c.isTrue());
  }
}
