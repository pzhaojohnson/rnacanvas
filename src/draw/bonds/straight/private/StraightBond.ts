import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

import { v4 as uuidv4 } from 'uuid';

import type { StrungElement } from 'Draw/bonds/strung/StrungElement';

export type ConstructorArgs = {
  base1: Base;
  base2: Base;

  line: SVG.Line;
};

/**
 * Contains the data of a straight bond.
 */
export class StraightBond {
  readonly base1: Base;
  readonly base2: Base;

  readonly line: SVG.Line;

  strungElements: StrungElement[];

  /**
   * Initializes the ID of the line element with a UUID if it is not
   * already defined.
   *
   * (Does not overwrite the ID of the line element if it is already
   * defined.)
   *
   * The line element must have a unique ID for straight bonds to be
   * properly saved when saving a drawing.
   */
  constructor(args: ConstructorArgs) {
    let { base1, base2, line } = args;

    this.base1 = base1;
    this.base2 = base2;

    // must start with a letter per HTML rules
    let defaultLineId = 'uuid-' + uuidv4();

    // use the attr method and not the id method
    // (since the id method might initialize the ID to a non-UUID)
    if (!line.attr('id')) {
      line.attr('id', defaultLineId);
    }

    this.line = line;

    this.strungElements = [];
  }
}
