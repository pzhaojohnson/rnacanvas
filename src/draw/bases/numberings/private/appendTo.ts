import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import * as SVG from '@svgdotjs/svg.js';

export class BaseNumberingDecorator {
  decoratee: BaseNumbering;

  constructor(decoratee: BaseNumbering) {
    this.decoratee = decoratee;
  }

  appendTo(svg: SVG.Svg) {
    this.decoratee.line.addTo(svg);

    // keep text on top of line
    this.decoratee.text.addTo(svg);
  }

  remove() {
    this.decoratee.text.remove();
    this.decoratee.line.remove();
  }
}
