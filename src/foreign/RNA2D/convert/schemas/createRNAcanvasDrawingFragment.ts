import type { SchemaWrapper as RNA2DSchema } from 'Foreign/RNA2D/wrappers/schemas/SchemaWrapper';

import { DrawingFragment as RNAcanvasDrawingFragment } from 'Draw/fragments/DrawingFragment';

import { createRNAcanvasDrawingFragment as fromRNA2DRNAMolecule } from 'Foreign/RNA2D/convert/rna-molecules/createRNAcanvasDrawingFragment';

export type Args = {
  rna2DSchema: RNA2DSchema;
};

export function createRNAcanvasDrawingFragment(args: Args) {
  let { rna2DSchema } = args;

  let rna2DClasses: InstanceType<typeof RNA2DSchema>['classes'] = [];

  // in case the classes array is missing
  try {
    rna2DClasses = rna2DSchema.classes;
  } catch {
    console.log('No RNA 2D classes found.');
  }

  let frags: ReturnType<typeof fromRNA2DRNAMolecule>[] = [];

  rna2DSchema.rnaComplexes.forEach(rc => {
    rc.rnaMolecules.forEach(rm => {
      frags.push(fromRNA2DRNAMolecule({
        rna2DRNAMolecule: rm,
        rna2DClasses,
      }));
    });
  });

  let combinedFrag = new RNAcanvasDrawingFragment();

  frags.forEach(frag => frag.appendTo(combinedFrag));

  combinedFrag.setPadding({
    horizontal: window.screen.width,
    vertical: window.screen.height,
  });

  return combinedFrag;
}
