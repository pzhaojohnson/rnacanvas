import type { LabelContentWrapper as RNA2DLabelContent } from 'Foreign/RNA2D/wrappers/labels/contents/LabelContentWrapper';

import type { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import * as SVG from '@svgdotjs/svg.js';

let rnaCanvasBaseNumberingTextDefaults = {
  'font-family': 'Arial',
  'font-size': 9,
  'font-weight': 'normal',
  'fill': '#525252',
  'fill-opacity': 1,
};

export type Args = {
  rna2DLabelContent: RNA2DLabelContent;

  rna2DClasses?: RNA2DClass[];
};

/**
 * Creates the text element of an RNAcanvas base numbering.
 */
export function createRNAcanvasBaseNumberingText(args: Args) {
  let { rna2DLabelContent, rna2DClasses } = args;

  let text = new SVG.Text();

  text.text(String(rna2DLabelContent.label));

  text.attr(rnaCanvasBaseNumberingTextDefaults);

  // apply RNA 2D classes after applying default values
  // (so that RNA 2D classes overwrite default values)
  rna2DClasses?.forEach(c => {
    try {
      if (rna2DLabelContent.classes.includes(c.name)) {
        text.attr(c.styleProperties);
      }
    } catch (error) {
      console.error(error);
      console.error(`Invalid RNA 2D class: ${c}.`);
    }
  });

  // must position text after styling
  text.center(rna2DLabelContent.x, rna2DLabelContent.y);

  return text;
}
