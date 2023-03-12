import type { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import { SVGCircleDefaults } from 'Settings/defaults/svg/SVGCircleDefaults';

export type SavedCircleBaseOutlineDefaults = (
  ReturnType<
    InstanceType<typeof CircleBaseOutlineDefaults>['toSaved']
  >
);

/**
 * Default values for circle base outlines in the drawing of the app.
 */
export class CircleBaseOutlineDefaults {
  circle = new SVGCircleDefaults();

  constructor() {
    this.circle['r'].setValue(7);

    this.circle['stroke'].setValue('#00ffff');
    this.circle['stroke-width'].setValue(1);
    this.circle['stroke-opacity'].setValue(1);

    this.circle['fill'].setValue('#c3ffff');
    this.circle['fill-opacity'].setValue(1);
  }

  /**
   * Sets the values of the circle base outline to these default
   * values.
   */
  applyTo(cbo: CircleBaseOutline) {
    this.circle.applyTo(cbo.circle);
  }

  /**
   * Returns the saved form of these circle base outline defaults,
   * which can be converted directly to and from JSON.
   */
  toSaved() {
    return {
      circle: this.circle.toSaved(),
    };
  }

  /**
   * Sets the values of these circle base outline defaults to the saved
   * values.
   */
  applySaved(saved: SavedCircleBaseOutlineDefaults): void;

  /**
   * Since the saved values could have been read from a file, this
   * method is designed to be able to handle any unknown value(s).
   *
   * Invalid and undefined values are ignored.
   */
  applySaved(saved: unknown): void | never;

  applySaved(saved: unknown): void | never {
    try {
      let savedCircleDefaults: unknown = (saved as any).circle;
      this.circle.applySaved(savedCircleDefaults);
    } catch {}
  }
}
