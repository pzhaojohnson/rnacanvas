import type { BasicDrawingFragment } from './BasicDrawingFragment';

import type { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

export class DrawingFragmentDecorator {
  readonly decoratee: BasicDrawingFragment;

  constructor(decoratee: BasicDrawingFragment) {
    this.decoratee = decoratee;
  }

  appendSecondaryBond(sb: SecondaryBond) {
    sb.appendTo(this.decoratee.svg);
    this.decoratee.secondaryBonds.push(sb);
  }
}
