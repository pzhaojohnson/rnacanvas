export interface Config {
  targetForm: HTMLElement;

  currentTranslationMeasurer: {
    /**
     * Returns the current translation of the target form (in CSS pixels)
     * as specified by its translate CSS property.
     */
    measure(): { x: number; y: number; };
  }
}

export class FormTranslater {
  constructor(private config: Config) {}

  /**
   * Translates the target form by the specified X and Y amounts (in CSS pixels).
   *
   * Does so by modifying the translate CSS property of the target form.
   *
   * Takes into account the previous value of the translate CSS property
   * (i.e., adds the specified X and Y amounts to translate by to it).
   */
  translate({ x, y }: { x: number, y: number }): void {
    let curr = this.config.currentTranslationMeasurer.measure();

    this.config.targetForm.style.translate = `${curr.x + x}px ${curr.y + y}px`;
  }
}
