import { BasicDrawingFragment } from './private/BasicDrawingFragment';

import * as AppendPrimaryBond from './private/appendPrimaryBond';

/**
 * Comparable to the document fragment class.
 */
export class DrawingFragment {
  /**
   * This class wraps a basic drawing fragment.
   */
  readonly wrappee = new BasicDrawingFragment();

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
