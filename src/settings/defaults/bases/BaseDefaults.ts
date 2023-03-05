import { SVGFontFamily } from 'Values/svg/SVGFontFamily';
import { SVGFontSize } from 'Values/svg/SVGFontSize';
import { SVGFontWeight } from 'Values/svg/SVGFontWeight';
import { SVGFontStyle } from 'Values/svg/SVGFontStyle';

/**
 * Default values for bases in the drawing of the app.
 */
export class BaseDefaults {
  text: {
    'font-family': SVGFontFamily,
    'font-size': SVGFontSize,
    'font-weight': SVGFontWeight,
    'font-style': SVGFontStyle,
  };

  constructor() {
    this.text = {
      'font-family': new SVGFontFamily('Arial'),
      'font-size': new SVGFontSize(9),
      'font-weight': new SVGFontWeight(700),
      'font-style': new SVGFontStyle('normal'),
    };
  }
}
