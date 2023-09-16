export interface Condition {
  isTrue(): boolean;
}

export class AllConditionsAreTrue implements Condition {
  _conditionsToReportOn: Condition[];

  constructor(conditionsToReportOn: Condition[]) {
    this._conditionsToReportOn = conditionsToReportOn;
  }

  /**
   * Returns true if all the conditions to report on are true
   * and false otherwise.
   *
   * Vacuously returns true if the conditions to report on are an
   * empty array.
   */
  isTrue(): boolean {
    return this._conditionsToReportOn.every(c => c.isTrue());
  }
}
