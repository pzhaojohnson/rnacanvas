import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

import { ParentSVGDocEnsurerBuilder } from 'Draw/bases/numberings/parent-SVG-doc/ParentSVGDocEnsurerBuilder';

let parentSVGDocEnsurerBuilder = new ParentSVGDocEnsurerBuilder();
let parentSVGDocEnsurer = parentSVGDocEnsurerBuilder.build();

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

    let parentSVGDoc: unknown = this.decoratee.text.root();

    if (parentSVGDoc instanceof SVG.Svg && numbering) {
      parentSVGDocEnsurer.ensureFor({
        baseNumbering: numbering,
        svgDoc: parentSVGDoc,
      });
    }
  }
}
