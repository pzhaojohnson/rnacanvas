import { ResidueWrapper as RNA2DResidue } from 'Foreign/RNA2D/wrappers/residues/ResidueWrapper';

import { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { Base as RNAcanvasBase } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

export type Args = {
  rna2DResidue: RNA2DResidue;

  rna2DClasses?: RNA2DClass[];
};

export function createRNAcanvasBase(args: Args): RNAcanvasBase {
  let { rna2DResidue, rna2DClasses } = args;

  let text = new SVG.Text();

  text.text(rna2DResidue.residueName);

  rna2DClasses?.forEach(c => {
    try {
      if (rna2DResidue.classes.includes(c.name)) {
        text.attr(c.styleProperties);
      }
    } catch (error) {
      console.error(error);
      console.error(`Invalid RNA 2D class: ${c}`);
    }
  });

  // must style text before setting center coordinates
  text.center(rna2DResidue.x, rna2DResidue.y);

  return new RNAcanvasBase({ text });
}
