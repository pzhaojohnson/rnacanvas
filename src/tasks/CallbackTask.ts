export class CallbackTask {
  constructor(private callbackFn: () => void) {}

  /**
   * Calls the callback function.
   */
  do(): void {
    this.callbackFn();
  }
}
