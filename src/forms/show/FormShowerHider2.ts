export interface Task {
  /**
   * Does the task.
   */
  do(): void;
}

export type Config = {
  /**
   * Shows the target form.
   */
  show: Task;

  /**
   * Hides the target form.
   */
  hide: Task;

  hideSignaller: {
    /**
     * The provided listener should be called whenever the target form is to be hidden.
     */
    addListener(listener: () => void): void;
  }
};

export class FormShowerHider2 {
  constructor(private config: Config) {
    config.hideSignaller.addListener(() => this.hide());
  }

  show() {
    this.config.show.do();
  }

  private hide() {
    this.config.hide.do();
  }
}
