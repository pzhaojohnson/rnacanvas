import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

/**
 * Default values for SVG line elements in the drawing of the app.
 */
export class SVGLineDefaults {
  'stroke' = new SVGColor('#000000');
  'stroke-width' = new NonNegativeFiniteNumber(1);
  'stroke-opacity' = new SVGOpacity(1);
}
