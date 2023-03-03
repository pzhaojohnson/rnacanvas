export class Settings {
  /**
   * Specifies whether or not to show a prompt before the user leaves
   * asking for confirmation to avoid losing unsaved work.
   */
  askBeforeLeaving: boolean;

  constructor() {
    this.askBeforeLeaving = true;
  }
}
