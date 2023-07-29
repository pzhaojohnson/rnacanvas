import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

import { SVGDocContainsBaseOutlineEnsurer } from 'Draw/bases/outlines/containers/SVGDocContainsBaseOutlineEnsurer';

let svgDocContainsBaseOutlineEnsurer = new SVGDocContainsBaseOutlineEnsurer();

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

    let svgDoc: unknown = this.decoratee.text.root();

    if (svgDoc instanceof SVG.Svg && outline) {
      svgDocContainsBaseOutlineEnsurer.ensureFor({
        svgDoc,
        baseOutline: outline,
      });
    }
  }
}
