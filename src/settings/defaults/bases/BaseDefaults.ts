import type { Base } from 'Draw/bases/Base';

import { SVGFontFamily } from 'Values/svg/SVGFontFamily';
import { SVGFontSize } from 'Values/svg/SVGFontSize';
import { SVGFontWeight } from 'Values/svg/SVGFontWeight';
import { SVGFontStyle } from 'Values/svg/SVGFontStyle';

export type SavedBaseDefaults = (
  ReturnType<
    InstanceType<typeof BaseDefaults>['toSaved']
  >
);

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

  /**
   * Sets the values of the base to these default values.
   */
  applyTo(b: Base) {
    b.text.attr({
      'font-family': this.text['font-family'].getValue(),
      'font-size': this.text['font-size'].getValue(),
      'font-weight': this.text['font-weight'].getValue(),
      'font-style': this.text['font-style'].getValue(),
    });
  }

  /**
   * Returns the saved form of these base defaults, which can be
   * directly converted to and from JSON.
   */
  toSaved() {
    return {
      text: {
        'font-family': this.text['font-family'].getValue(),
        'font-size': this.text['font-size'].getValue(),
        'font-weight': this.text['font-weight'].getValue(),
        'font-style': this.text['font-style'].getValue(),
      },
    };
  }
}
