import type { Base } from 'Draw/bases/Base';

import { SVGTextDefaults } from 'Settings/defaults/svg/SVGTextDefaults';

export type SavedBaseDefaults = (
  ReturnType<
    InstanceType<typeof BaseDefaults>['toSaved']
  >
);

/**
 * Default values for bases in the drawing of the app.
 */
export class BaseDefaults {
  text = new SVGTextDefaults();

  constructor() {
    this.text['font-family'].setValue('Arial');
    this.text['font-size'].setValue(9);
    this.text['font-weight'].setValue(700);
    this.text['font-style'].setValue('normal');
  }

  /**
   * Sets the values of the base to these default values.
   */
  applyTo(b: Base) {
    this.text.applyTo(b.text);
  }

  /**
   * Returns the saved form of these base defaults, which can be
   * directly converted to and from JSON.
   */
  toSaved() {
    return {
      text: this.text.toSaved(),
    };
  }

  /**
   * Sets the values of these base defaults to the values of the saved
   * base defaults.
   *
   * Since the saved base defaults could have been read from a file,
   * this method is designed to be able to handle any unknown saved
   * value(s).
   *
   * Invalid and undefined saved values are ignored.
   */
  applySaved(saved: SavedBaseDefaults | unknown) {
    try {
      let savedTextDefaults: unknown = (saved as any).text;
      this.text.applySaved(savedTextDefaults);
    } catch {}
  }
}
