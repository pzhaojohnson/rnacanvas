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
}
