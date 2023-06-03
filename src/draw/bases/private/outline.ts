import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

export class BaseDecorator {
  readonly decoratee: Base;

  constructor(decoratee: Base) {
    this.decoratee = decoratee;
  }

  get outline() {
    return this.decoratee._outline;
  }

  set outline(outline) {
    // remove any outline that the base already has
    if (this.decoratee._outline) {
      this.decoratee._outline.remove();
      this.decoratee._outline = undefined;
    }

    this.decoratee._outline = outline;

    outline?.reposition({ baseCenter: this.decoratee._center });

    let svg: unknown = this.decoratee.text.root();

    if (svg instanceof SVG.Svg) {
      outline?.appendTo(svg);
    }
  }
}
