export interface Condition {
  isTrue(): boolean;
}

export class ConditionIsFalse implements Condition {
  _conditionToReportOn: Condition;

  constructor(conditionToReportOn: Condition) {
    this._conditionToReportOn = conditionToReportOn;
  }

  /**
   * Returns true if the condition to report on is false
   * (and vice versa).
   */
  isTrue(): boolean {
    return !this._conditionToReportOn.isTrue();
  }
}
