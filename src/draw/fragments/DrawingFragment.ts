import { BasicDrawingFragment } from './private/BasicDrawingFragment';

import * as AppendSequence from './private/appendSequence';

import * as Bases from './private/bases';

import * as AppendPrimaryBond from './private/appendPrimaryBond';

import * as AppendSecondaryBond from './private/appendSecondaryBond';

import * as SetPadding from './private/setPadding';

import * as AppendTo from './private/appendTo';

/**
 * Comparable to the document fragment class.
 */
export class DrawingFragment {
  /**
   * This class wraps a basic drawing fragment.
   */
  readonly wrappee = new BasicDrawingFragment();

  /**
   * The SVG document of the drawing fragment.
   */
  get svg() {
    return this.wrappee.svg;
  }

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

  get secondaryBonds() {
    return this.wrappee.secondaryBonds;
  }

  appendSecondaryBond(
    ...args: Parameters<
      InstanceType<
        typeof AppendSecondaryBond.DrawingFragmentDecorator
      >['appendSecondaryBond']
    >
  ) {
    return (new AppendSecondaryBond.DrawingFragmentDecorator(this.wrappee))
      .appendSecondaryBond(...args);
  }

  setPadding(
    ...args: Parameters<
      InstanceType<typeof SetPadding.DrawingFragmentDecorator>['setPadding']
    >
  ) {
    return (new SetPadding.DrawingFragmentDecorator(this.wrappee))
      .setPadding(...args);
  }

  appendTo(
    ...args: Parameters<
      InstanceType<typeof AppendTo.DrawingFragmentDecorator>['appendTo']
    >
  ) {
    return (new AppendTo.DrawingFragmentDecorator(this.wrappee))
      .appendTo(...args);
  }
}
