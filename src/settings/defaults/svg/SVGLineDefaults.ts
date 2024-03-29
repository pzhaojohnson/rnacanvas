import * as SVG from '@svgdotjs/svg.js';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

const attributeNames = [
  'stroke',
  'stroke-width',
  'stroke-opacity',
] as const;

type AttributeName = typeof attributeNames[number];

export type SavedSVGLineDefaults = (
  ReturnType<
    InstanceType<typeof SVGLineDefaults>['toSaved']
  >
);

/**
 * Default values for SVG line elements in the drawing of the app.
 */
export class SVGLineDefaults {
  'stroke' = new SVGColor('#000000');
  'stroke-width' = new NonNegativeFiniteNumber(1);
  'stroke-opacity' = new SVGOpacity(1);

  /**
   * Sets the values of the SVG line element to these default values.
   */
  applyTo(line: SVG.Line) {
    attributeNames.forEach(name => {
      line.attr(name, this[name].getValue());
    });
  }

  /**
   * Returns the saved form of these SVG line element defaults.
   *
   * The saved form of these SVG line element defaults can be directly
   * converted to and from JSON.
   */
  toSaved() {
    return {
      'stroke': this['stroke'].toSaved(),
      'stroke-width': this['stroke-width'].toSaved(),
      'stroke-opacity': this['stroke-opacity'].toSaved(),
    };
  }

  /**
   * Sets the values of these SVG line element defaults to the saved
   * values.
   */
  applySaved(saved: SavedSVGLineDefaults): void;

  /**
   * Since the saved values could have been read from a file, this
   * method is designed to be able to handle any unknown saved
   * value(s).
   *
   * Invalid and undefined saved values are ignored.
   */
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    attributeNames.forEach(name => {
      try {
        this[name].applySaved((saved as any)[name]);
      } catch {}
    });
  }
}
