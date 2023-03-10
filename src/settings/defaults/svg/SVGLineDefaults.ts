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
      'stroke': this['stroke'].getValue(),
      'stroke-width': this['stroke-width'].getValue(),
      'stroke-opacity': this['stroke-opacity'].getValue(),
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
    type SavedAttribute = { name: AttributeName, value: unknown };
    let savedAttributes: SavedAttribute[] = [];

    // enclose any type cast in try block
    attributeNames.forEach(name => {
      try {
        let value: unknown = (saved as any)[name];
        savedAttributes.push({ name, value });
      } catch {}
    });

    savedAttributes = savedAttributes.filter(a => a.value !== undefined);

    // setValue method might throw for invalid values
    savedAttributes.forEach(a => {
      try {
        this[a.name].setValue(a.value);
      } catch {}
    });
  }
}
