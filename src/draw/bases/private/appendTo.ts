import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

export class BaseDecorator {
  readonly decoratee: Base;

  constructor(decoratee: Base) {
    this.decoratee = decoratee;
  }

  appendTo(svg: SVG.Svg) {
    // place outline the lowest
    this.decoratee.outline?.appendTo(svg);

    // place numbering in the middle
    this.decoratee.numbering?.appendTo(svg);

    // place text on top
    this.decoratee.text.addTo(svg);
  }

  remove() {
    this.decoratee.text.remove();
    this.decoratee.numbering?.remove();
    this.decoratee.outline?.remove();
  }
}
