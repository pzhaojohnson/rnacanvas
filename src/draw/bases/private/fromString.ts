import { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

import { v4 as uuidv4 } from 'uuid';

export class BaseDecorator {
  static fromString(s: string): Base {
    let text = new SVG.Text();

    // set the text content
    text.text(s);

    // must start with a letter per HTML rules
    let id = 'uuid-' + uuidv4();

    text.attr('id', id);

    return new Base({ text });
  }
}
