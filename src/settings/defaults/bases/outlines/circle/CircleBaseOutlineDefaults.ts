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
}
