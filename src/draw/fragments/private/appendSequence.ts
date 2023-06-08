import type { BasicDrawingFragment } from './BasicDrawingFragment';

import type { Sequence } from 'Draw/sequences/Sequence';

import { createPrimaryBond } from 'Draw/bonds/straight/createPrimaryBond';

import * as AppendPrimaryBond from './appendPrimaryBond';

export class DrawingFragmentDecorator {
  readonly decoratee: BasicDrawingFragment;

  constructor(decoratee: BasicDrawingFragment) {
    this.decoratee = decoratee;
  }

  _appendPrimaryBond(
    ...args: Parameters<
      InstanceType<
        typeof AppendPrimaryBond.DrawingFragmentDecorator
      >['appendPrimaryBond']
    >
  ) {
    return (new AppendPrimaryBond.DrawingFragmentDecorator(this.decoratee))
      .appendPrimaryBond(...args);
  }

  /**
   * Will also append the necessary primary bonds to connect the bases
   * in the sequence.
   */
  appendSequence(seq: Sequence) {
    // append primary bonds
    for (let p = 1; p < seq.length; p++) {
      let base1 = seq.getBaseAtPosition(p);
      let base2 = seq.getBaseAtPosition(p + 1);

      if (base1 && base2) {
        let pb = createPrimaryBond({ base1, base2 });
        this._appendPrimaryBond(pb);
      }
    }

    // place sequence on top of primary bonds
    seq.appendTo(this.decoratee.svg);

    this.decoratee.sequences.push(seq);
  }
}
