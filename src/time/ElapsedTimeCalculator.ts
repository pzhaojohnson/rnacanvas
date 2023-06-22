export class ElapsedTimeCalculator {
  /**
   * The time (in milliseconds) to calculate elapsed time in reference
   * to.
   */
  _startTime: number;

  constructor() {
    this._startTime = Date.now();
  }

  /**
   * Returns the elapsed time in milliseconds.
   *
   * Elapsed time is calculated in reference to the time when the
   * class instance was instantiated or when the restartCounting
   * method was last called (if the restartCounting method has been
   * called at all).
   */
  calculate(): number {
    return Date.now() - this._startTime;
  }

  /**
   * Causes the elapsed time to now be calculated in reference to the
   * moment this method is called.
   */
  restartCounting() {
    this._startTime = Date.now();
  }
}
