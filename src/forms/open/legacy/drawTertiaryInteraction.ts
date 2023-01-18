import type { App } from 'App';

import type { Sequence } from 'Draw/sequences/Sequence';

import type { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import { addTertiaryBond } from 'Draw/bonds/curved/add';

import * as SVG from '@svgdotjs/svg.js';

export type Drawing = typeof App.prototype.drawing;

export type Side = {
  parentSequence: Sequence;

  /**
   * Start position of the side.
   */
  start: number;

  /**
   * End position of the side.
   */
  end: number;
};

export type TertiaryInteractionSpec = {
  side1: Side;
  side2: Side;

  color?: SVG.Color;
};

export class DrawingWrapper {
  /**
   * The wrapped drawing.
   */
  readonly drawing: Drawing;

  constructor(drawing: Drawing) {
    this.drawing = drawing;
  }

  /**
   * The two sides of the tertiary interaction are always expected to be
   * of the same length.
   */
  drawTertiaryInteraction(spec: TertiaryInteractionSpec) {
    let { side1, side2 } = spec;

    let sideLength1 = side1.end - side1.start + 1;

    let tertiaryBonds: TertiaryBond[] = [];

    for (let i = 0; i < sideLength1; i++) {
      let p1 = side1.start + i;
      let p2 = side2.end - i;
      p2 = Math.max(p2, side2.start); // in case side 1 is longer

      let b1 = side1.parentSequence.getBaseAtPosition(p1);
      let b2 = side2.parentSequence.getBaseAtPosition(p2);

      if (b1 && b2) {
        let tb = addTertiaryBond(this.drawing.drawing, b1, b2);
        tertiaryBonds.push(tb);
      }
    }

    let color = spec.color?.toHex() ?? '#8cd4e8';

    tertiaryBonds.forEach(tb => {
      tb.path.attr({
        'stroke': color,
        'stroke-width': 1,
        'stroke-opacity': 1,
      });
    });
  }
}
