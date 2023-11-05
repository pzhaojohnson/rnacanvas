export class Signaller {
  private listeners: (() => void)[] = [];

  /**
   * Added listeners will be called when the signaller gives the signal.
   */
  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  /**
   * Gives the signal (i.e., calls all added listeners).
   */
  signal(): void {
    this.listeners.forEach(listener => listener());
  }
}
