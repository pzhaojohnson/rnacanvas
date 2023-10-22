export type Config = {
  /**
   * Hide signals will be given whenever this button is clicked.
   */
  hideButton: {
    addEventListener(name: 'click', listener: () => void): void;
  }
};

/**
 * Converts clicks on some sort of hide button to hide signals.
 */
export class HideSignaller {
  private listeners: (() => void)[];

  constructor(private config: Config) {
    this.listeners = [];

    config.hideButton.addEventListener('click', () => {
      this.listeners.forEach(listener => listener());
    });
  }

  /**
   * Adds the listener to the list of listeners that will be called
   * whenever hide signals are given.
   */
  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }
}
