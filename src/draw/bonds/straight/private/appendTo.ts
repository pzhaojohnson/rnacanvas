import type { StraightBond } from './StraightBond';

import * as SVG from '@svgdotjs/svg.js';

import { appendStrungElement } from 'Draw/bonds/strung/add';

import { removeStrungElement } from 'Draw/bonds/strung/add';

export class StraightBondDecorator {
  readonly decoratee: StraightBond;

  constructor(decoratee: StraightBond) {
    this.decoratee = decoratee;
  }

  appendTo(svg: SVG.Svg) {
    // append line first
    this.decoratee.line.addTo(svg);

    // place strung elements on top
    this.decoratee.strungElements.forEach(se => {
      appendStrungElement(svg, se);
    });
  }

  remove() {
    this.decoratee.strungElements.forEach(se => {
      removeStrungElement(se);
    });

    this.decoratee.line.remove();
  }
}
