export class Settings {
  /**
   * Specifies whether or not a prompt should be displayed before
   * the user leaves warning about possibly losing unsaved work.
   */
  askBeforeLeaving: boolean;

  constructor() {
    this.askBeforeLeaving = true;
  }
}
