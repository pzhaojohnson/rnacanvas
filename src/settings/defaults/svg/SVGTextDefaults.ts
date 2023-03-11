import * as SVG from '@svgdotjs/svg.js';

import { SVGFontFamily } from 'Values/svg/SVGFontFamily';
import { SVGFontSize } from 'Values/svg/SVGFontSize';
import { SVGFontWeight } from 'Values/svg/SVGFontWeight';
import { SVGFontStyle } from 'Values/svg/SVGFontStyle';

import { SVGColor } from 'Values/svg/SVGColor';

import { SVGOpacity } from 'Values/svg/SVGOpacity';

const attributeNames = [
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'fill',
  'fill-opacity',
] as const;

type AttributeName = typeof attributeNames[number];

export type SavedSVGTextDefaults = (
  ReturnType<
    InstanceType<typeof SVGTextDefaults>['toSaved']
  >
);

/**
 * Possible default values to be used for SVG text elements in the
 * drawing of the app.
 */
export class SVGTextDefaults {
  'font-family' = new SVGFontFamily('Arial');
  'font-size' = new SVGFontSize(9);
  'font-weight' = new SVGFontWeight(400);
  'font-style' = new SVGFontStyle('normal');

  'fill' = new SVGColor('#000000');
  'fill-opacity' = new SVGOpacity(1);

  /**
   * Sets the values of the SVG text element to these default values.
   */
  applyTo(text: SVG.Text) {
    attributeNames.forEach(name => {
      text.attr(name, this[name].getValue());
    });
  }

  /**
   * Returns the saved form of these SVG text element defaults.
   *
   * The saved form of these SVG text element defaults can be directly
   * converted to and from JSON.
   */
  toSaved() {
    return {
      'font-family': this['font-family'].toSaved(),
      'font-size': this['font-size'].toSaved(),
      'font-weight': this['font-weight'].toSaved(),
      'font-style': this['font-style'].toSaved(),
      'fill': this['fill'].toSaved(),
      'fill-opacity': this['fill-opacity'].toSaved(),
    };
  }

  /**
   * Sets the values of these SVG text element defaults to the saved
   * values.
   */
  applySaved(saved: SavedSVGTextDefaults): void;

  /**
   * Since the saved values could have come from anywhere (e.g., a
   * file), this method is designed to be able to handle any unknown
   * saved value(s).
   *
   * Invalid saved values and values of undefined are ignored.
   */
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    attributeNames.forEach(name => {
      try {
        let savedAttribute: unknown = (saved as any)[name];
        this[name].applySaved(savedAttribute);
      } catch {}
    });
  }
}
