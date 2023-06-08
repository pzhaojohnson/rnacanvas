import { BasicDrawingFragment } from './BasicDrawingFragment';

import * as AppendSequence from './appendSequence';

export class DrawingFragmentDecorator {
  readonly decoratee: BasicDrawingFragment;

  constructor(decoratee: BasicDrawingFragment) {
    this.decoratee = decoratee;
  }

  /**
   * Included for testing purposes.
   */
  _appendSequence(
    ...args: Parameters<
      InstanceType<
        typeof AppendSequence.DrawingFragmentDecorator
      >['appendSequence']
    >
  ) {
    return (new AppendSequence.DrawingFragmentDecorator(this.decoratee))
      .appendSequence(...args);
  }

  /**
   * Returns an array of all bases in the drawing fragment.
   */
  get bases() {
    return this.decoratee.sequences.flatMap(seq => {
      // create a new array just to be safe
      return [...seq.bases];
    });
  }
}
