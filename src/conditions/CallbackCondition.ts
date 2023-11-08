export class CallbackCondition {
  constructor(private callbackFn: () => boolean) {}

  /**
   * Returns the result of calling the callback function.
   */
  isTrue(): boolean {
    return this.callbackFn();
  }
}
