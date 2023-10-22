export type Config = {
  targetForm: HTMLElement;
};

export type Vector = {
  x: number;
  y: number;
};

export class CurrentTranslationMeasurer {
  constructor(private config: Config) {}

  /**
   * Measures the current translation of the target form (as
   * controlled by the translate CSS property).
   *
   * Does not take into account translation transformations
   * controlled by other CSS properties, such as transform.
   */
  measure(): Vector {
    let bbox = this.config.targetForm.getBoundingClientRect();

    let translatedX = bbox.x;
    let translatedY = bbox.y;

    let translate = this.config.targetForm.style.translate;

    // in order to get untranslated coordinates
    this.config.targetForm.style.translate = 'none';

    bbox = this.config.targetForm.getBoundingClientRect();

    let untranslatedX = bbox.x;
    let untranslatedY = bbox.y;

    // don't forget to set back to its original value
    this.config.targetForm.style.translate = translate;

    return {
      x: translatedX - untranslatedX,
      y: translatedY - untranslatedY,
    };
  }
}
