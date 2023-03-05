import type { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

const circleAttributeNames = [
  'r',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'fill',
  'fill-opacity',
] as const;

type CircleAttributeName = typeof circleAttributeNames[number];

export type SavedCircleBaseOutlineDefaults = (
  ReturnType<
    InstanceType<typeof CircleBaseOutlineDefaults>['toSaved']
  >
);

/**
 * Default values for circle base outlines in the drawing of the app.
 */
export class CircleBaseOutlineDefaults {
  circle: {
    'r': NonNegativeFiniteNumber,
    'stroke': SVGColor,
    'stroke-width': NonNegativeFiniteNumber,
    'stroke-opacity': SVGOpacity,
    'fill': SVGColor,
    'fill-opacity': SVGOpacity,
  };

  constructor() {
    this.circle = {
      'r': new NonNegativeFiniteNumber(7),
      'stroke': new SVGColor('#00ffff'),
      'stroke-width': new NonNegativeFiniteNumber(1),
      'stroke-opacity': new SVGOpacity(1),
      'fill': new SVGColor('#c3ffff'),
      'fill-opacity': new SVGOpacity(1),
    };
  }

  /**
   * Sets the values of the circle base outline to these default
   * values.
   */
  applyTo(cbo: CircleBaseOutline) {
    circleAttributeNames.forEach(name => {
      cbo.circle.attr(name, this.circle[name].getValue());
    });
  }

  /**
   * Returns the saved form of these circle base outline defaults,
   * which can be converted directly to and from JSON.
   */
  toSaved() {
    return {
      circle: {
        'r': this.circle['r'].getValue(),
        'stroke': this.circle['stroke'].getValue(),
        'stroke-width': this.circle['stroke-width'].getValue(),
        'stroke-opacity': this.circle['stroke-opacity'].getValue(),
        'fill': this.circle['fill'].getValue(),
        'fill-opacity': this.circle['fill-opacity'].getValue(),
      },
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
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    circleAttributeNames.forEach(name => {
      try {
        // could throw since the type of saved is unknown
        let value: unknown = (saved as any).circle[name];

        if (value !== undefined) {
          // setValue method might throw for invalid values
          this.circle[name].setValue(value);
        }
      } catch {
        // just ignore invalid and undefined values
      }
    });
  }
}
