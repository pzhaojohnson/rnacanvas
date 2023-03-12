import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

const attributeNames = [
  'r',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'fill',
  'fill-opacity',
] as const;

type AttributeName = typeof attributeNames[number];

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
}
