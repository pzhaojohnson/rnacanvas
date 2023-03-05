import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

import { SVGFontFamily } from 'Values/svg/SVGFontFamily';
import { SVGFontSize } from 'Values/svg/SVGFontSize';
import { SVGFontWeight } from 'Values/svg/SVGFontWeight';

const textAttributeNames = [
  'font-family',
  'font-size',
  'font-weight',
  'fill',
  'fill-opacity',
] as const;

const lineAttributeNames = [
  'stroke',
  'stroke-width',
  'stroke-opacity',
] as const;

const propertyNames = [
  'basePadding',
  'lineLength',
] as const;

/**
 * Default values for base numberings in the drawing of the app.
 */
export class BaseNumberingDefaults {
  text: {
    'font-family': SVGFontFamily,
    'font-size': SVGFontSize,
    'font-weight': SVGFontWeight,
    'fill': SVGColor,
    'fill-opacity': SVGOpacity,
  };

  line: {
    'stroke': SVGColor,
    'stroke-width': NonNegativeFiniteNumber,
    'stroke-opacity': SVGOpacity,
  };

  basePadding: NonNegativeFiniteNumber;
  lineLength: NonNegativeFiniteNumber;

  constructor() {
    this.text = {
      'font-family': new SVGFontFamily('Arial'),
      'font-size': new SVGFontSize(8),
      'font-weight': new SVGFontWeight(400),
      'fill': new SVGColor('#808080'),
      'fill-opacity': new SVGOpacity(1),
    };

    this.line = {
      'stroke': new SVGColor('#808080'),
      'stroke-width': new NonNegativeFiniteNumber(1),
      'stroke-opacity': new SVGOpacity(1),
    };

    this.basePadding = new NonNegativeFiniteNumber(8);
    this.lineLength = new NonNegativeFiniteNumber(8);
  }
}
