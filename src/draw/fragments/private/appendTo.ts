import type { BasicDrawingFragment } from './BasicDrawingFragment';

import type { DrawingFragment } from 'Draw/fragments/DrawingFragment';

import type { Drawing } from 'Draw/Drawing';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

export type DrawingLike = (
  Drawing
  | StrictDrawing
  | DrawingFragment
  | BasicDrawingFragment
);

export class DrawingFragmentDecorator {
  readonly decoratee: BasicDrawingFragment;

  constructor(decoratee: BasicDrawingFragment) {
    this.decoratee = decoratee;
  }

  appendTo(drawing: DrawingLike) {
    // append the content of the SVG document
    this.decoratee.svg.children().forEach(c => {
      c.addTo(drawing.svg);
    });

    drawing.sequences.push(...this.decoratee.sequences);
    drawing.primaryBonds.push(...this.decoratee.primaryBonds);
    drawing.secondaryBonds.push(...this.decoratee.secondaryBonds);
  }
}
