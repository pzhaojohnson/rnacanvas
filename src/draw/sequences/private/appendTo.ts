import type { Sequence } from './Sequence';

import * as SVG from '@svgdotjs/svg.js';

export class SequenceDecorator {
  readonly decoratee: Sequence;

  constructor(decoratee: Sequence) {
    this.decoratee = decoratee;
  }

  appendTo(svg: SVG.Svg) {
    this.decoratee.bases.forEach(b => {
      b.appendTo(svg);
    });
  }

  remove() {
    this.decoratee.bases.forEach(b => {
      b.remove();
    });
  }
}
