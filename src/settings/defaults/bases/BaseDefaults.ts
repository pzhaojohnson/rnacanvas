import type { Base } from 'Draw/bases/Base';

import { SVGFontFamily } from 'Values/svg/SVGFontFamily';
import { SVGFontSize } from 'Values/svg/SVGFontSize';
import { SVGFontWeight } from 'Values/svg/SVGFontWeight';
import { SVGFontStyle } from 'Values/svg/SVGFontStyle';

const textAttributeNames = [
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
] as const;

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

  /**
   * Sets the values of these base defaults to the values of the saved
   * base defaults.
   *
   * Since the saved base defaults could have been read from a file,
   * this method is designed to be able to handle any unknown saved
   * value(s).
   *
   * Invalid and undefined saved values are ignored.
   */
  applySaved(saved: SavedBaseDefaults | unknown) {
    textAttributeNames.forEach(name => {
      try {
        // could throw since type of saved is unknown
        let value: unknown = (saved as any).text[name];

        if (value !== undefined) {
          // setValue method might throw for invalid values
          this.text[name].setValue(value);
        }
      } catch {
        // just ignore invalid and undefined values
      }
    });
  }
}
