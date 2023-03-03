export class Settings {
  askBeforeLeaving: boolean;

  constructor() {
    // specifies whether or not a prompt should be displayed before
    // the user leaves warning about possibly losing unsaved work
    this.askBeforeLeaving = true;
  }
}
