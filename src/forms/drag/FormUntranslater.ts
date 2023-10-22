export type Config = {
  targetForm: HTMLElement;
};

export class FormUntranslater {
  constructor(private config: Config) {}

  /**
   * Untranslates the target form by setting its translate CSS
   * property to "none".
   */
  untranslate() {
    this.config.targetForm.style.translate = 'none';
  }
}
