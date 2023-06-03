import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

export class BaseDecorator {
  readonly decoratee: Base;

  constructor(decoratee: Base) {
    this.decoratee = decoratee;
  }

  get numbering() {
    return this.decoratee._numbering;
  }

  set numbering(numbering) {
    // remove any numbering that the base already has
    if (this.decoratee._numbering) {
      this.decoratee._numbering.remove();
      this.decoratee._numbering = undefined;
    }

    this.decoratee._numbering = numbering;

    numbering?.reposition({ baseCenter: this.decoratee.getCenter() });

    let parent: unknown = this.decoratee.text.root();

    if (parent instanceof SVG.Svg) {
      numbering?.appendTo(parent);
    }
  }
}
