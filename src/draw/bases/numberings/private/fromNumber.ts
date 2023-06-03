import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import * as SVG from '@svgdotjs/svg.js';

import { v4 as uuidv4 } from 'uuid';

export class BaseNumberingDecorator {
  /**
   * Sets line angle to zero and passes base center coordinates of
   * (0, 0) to the created base numbering.
   */
  static fromNumber(n: number): BaseNumbering {
    let text = new SVG.Text();

    text.text(String(n));

    let line = new SVG.Line();

    // line angle of 0
    line.attr({ 'x1': 0, 'y1': 0, 'x2': 1, 'y2': 0 });

    // assign UUIDs (must begin with letters per HTML rules)
    text.attr('id', 'uuid-' + uuidv4());
    line.attr('id', 'uuid-' + uuidv4());

    let baseCenter = { x: 0, y: 0 };

    let bn = new BaseNumbering(text, line, baseCenter);

    // apply default values
    bn.text.attr(BaseNumbering.recommendedDefaults.text);
    bn.line.attr(BaseNumbering.recommendedDefaults.line);
    bn.basePadding = BaseNumbering.recommendedDefaults.basePadding;
    bn.lineLength = BaseNumbering.recommendedDefaults.lineLength;

    return bn;
  }
}
