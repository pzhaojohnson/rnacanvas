import { BasicDrawingFragment } from './private/BasicDrawingFragment';

import * as AppendSequence from './private/appendSequence';

import * as Bases from './private/bases';

import * as AppendPrimaryBond from './private/appendPrimaryBond';

/**
 * Comparable to the document fragment class.
 */
export class DrawingFragment {
  /**
   * This class wraps a basic drawing fragment.
   */
  readonly wrappee = new BasicDrawingFragment();

  get sequences() {
    return this.wrappee.sequences;
  }

  appendSequence(
    ...args: Parameters<
      InstanceType<
        typeof AppendSequence.DrawingFragmentDecorator
      >['appendSequence']
    >
  ) {
    return (new AppendSequence.DrawingFragmentDecorator(this.wrappee))
      .appendSequence(...args);
  }

  get bases() {
    return (new Bases.DrawingFragmentDecorator(this.wrappee))
      .bases;
  }

  get primaryBonds() {
    return this.wrappee.primaryBonds;
  }

  appendPrimaryBond(
    ...args: Parameters<
      InstanceType<
        typeof AppendPrimaryBond.DrawingFragmentDecorator
      >['appendPrimaryBond']
    >
  ) {
    return (new AppendPrimaryBond.DrawingFragmentDecorator(this.wrappee))
      .appendPrimaryBond(...args);
  }
}
