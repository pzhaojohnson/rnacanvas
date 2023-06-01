import type { LabelLineWrapper as RNA2DLabelLine } from 'Foreign/RNA2D/wrappers/labels/lines/LabelLineWrapper';

import type { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import * as SVG from '@svgdotjs/svg.js';

let rnaCanvasBaseNumberingLineDefaults = {
  'stroke': '#525252',
  'stroke-width': 1,
  'stroke-opacity': 1,
  'stroke-dasharray': 'none',
};

export type Args = {
  rna2DLabelLine: RNA2DLabelLine;

  rna2DClasses?: RNA2DClass[];
};

/**
 * Creates the line element for an RNAcanvas base numbering.
 */
export function createRNAcanvasBaseNumberingLine(args: Args) {
  let { rna2DLabelLine, rna2DClasses } = args;

  let line = new SVG.Line();

  // apply default values
  line.attr(rnaCanvasBaseNumberingLineDefaults);

  // apply RNA 2D classes after default values
  // (so that RNA 2D classes overwrite default values)
  rna2DClasses?.forEach(c => {
    try {
      if (rna2DLabelLine.classes.includes(c.name)) {
        line.attr(c.styleProperties);
      }
    } catch (error) {
      console.error(error);
      console.error(`Invalid RNA 2D class: ${c}.`);
    }
  });

  // position the line
  line.attr({
    'x1': rna2DLabelLine.x1,
    'y1': rna2DLabelLine.y1,
    'x2': rna2DLabelLine.x2,
    'y2': rna2DLabelLine.y2,
  });

  return line;
}
