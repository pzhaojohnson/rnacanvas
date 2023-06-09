import type { BasicDrawingFragment } from './BasicDrawingFragment';

import * as AppendSequence from './appendSequence';

import * as Bases from './bases';

export type Padding = {
  /**
   * The horizontal component.
   */
  horizontal: number;

  /**
   * The vertical component.
   */
  vertical: number;
};

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

  get bases() {
    return (new Bases.DrawingFragmentDecorator(this.decoratee))
      .bases;
  }

  /**
   * Right now just uses the center coordinates of bases to adjust
   * horizontal and vertical padding.
   *
   * Will shift bases horizontally and vertically such that the minimum
   * base center coordinates are the specified horizontal and vertical
   * paddings, respectively.
   *
   * Will set the width and height of the drawing fragment to the
   * maximum base center coordinates plus the specified horizontal and
   * vertical paddings, respectively.
   *
   * Does nothing if there are no bases in the drawing fragment.
   */
  setPadding(padding: Padding) {
    let bases = this.bases;

    if (bases.length == 0) {
      return;
    }

    let baseCenter1 = bases[0].getCenter();

    let minX = baseCenter1.x;
    let maxX = baseCenter1.x;

    let minY = baseCenter1.y;
    let maxY = baseCenter1.y;

    bases.forEach(b => {
      let center = b.getCenter();

      minX = Math.min(minX, center.x);
      maxX = Math.max(maxX, center.x);

      minY = Math.min(minY, center.y);
      maxY = Math.max(maxY, center.y);
    });

    let shiftX = padding.horizontal - minX;
    let shiftY = padding.vertical - minY;

    bases.forEach(b => {
      let center = b.getCenter();
      let x = center.x + shiftX;
      let y = center.y + shiftY;
      b.setCenter({ x, y });
    });

    // reposition bonds after moving bases
    this.decoratee.primaryBonds.forEach(pb => pb.reposition());
    this.decoratee.secondaryBonds.forEach(sb => sb.reposition());

    // don't forget to account for X and Y shifts
    this.decoratee.svg.viewbox(
      0,
      0,
      maxX + shiftX + padding.horizontal,
      maxY + shiftY + padding.vertical,
    );
  }
}
