import * as SVG from '@svgdotjs/svg.js';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

const valueNames = [
  'r',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'fill',
  'fill-opacity',
] as const;

type ValueName = typeof valueNames[number];

export type SavedSVGCircleDefaults = (
  ReturnType<
    InstanceType<typeof SVGCircleDefaults>['toSaved']
  >
);

/**
 * Possible default values that could be used for SVG circle elements
 * in the drawing of the app.
 */
export class SVGCircleDefaults {
  'r' = new NonNegativeFiniteNumber(7);

  'stroke' = new SVGColor('#00ffff');
  'stroke-width' = new NonNegativeFiniteNumber(1);
  'stroke-opacity' = new SVGOpacity(1);

  'fill' = new SVGColor('#c3ffff');
  'fill-opacity' = new SVGOpacity(1);

  /**
   * Sets the values of the SVG circle element to these default values.
   */
  applyTo(circle: SVG.Circle) {
    valueNames.forEach(name => {
      circle.attr(name, this[name].getValue());
    });
  }

  /**
   * Returns the saved form of these SVG circle element defaults.
   *
   * The saved form of these SVG circle element defaults can be
   * directly converted to and from JSON.
   */
  toSaved() {
    return {
      'r': this['r'].toSaved(),
      'stroke': this['stroke'].toSaved(),
      'stroke-width': this['stroke-width'].toSaved(),
      'stroke-opacity': this['stroke-opacity'].toSaved(),
      'fill': this['fill'].toSaved(),
      'fill-opacity': this['fill-opacity'].toSaved(),
    };
  }
}
