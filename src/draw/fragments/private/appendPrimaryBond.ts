import type { BasicDrawingFragment } from './BasicDrawingFragment';

import type { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

export class DrawingFragmentDecorator {
  readonly decoratee: BasicDrawingFragment;

  constructor(decoratee: BasicDrawingFragment) {
    this.decoratee = decoratee;
  }

  appendPrimaryBond(pb: PrimaryBond) {
    pb.appendTo(this.decoratee.svg);
    this.decoratee.primaryBonds.push(pb);
  }
}
