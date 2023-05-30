import { ResidueWrapper as RNA2DResidue } from 'Foreign/RNA2D/wrappers/residues/ResidueWrapper';

import { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { createRNAcanvasBase } from 'Foreign/RNA2D/convert/residues/createRNAcanvasBase';

import { Sequence as RNAcanvasSequence } from 'Draw/sequences/Sequence';

export type Args = {
  id?: string;

  rna2DSequence: RNA2DResidue[];

  rna2DClasses?: RNA2DClass[];
};

export function createRNAcanvasSequence(args: Args): RNAcanvasSequence {
  let { id, rna2DSequence, rna2DClasses } = args;

  let rnaCanvasSequence = new RNAcanvasSequence(id ?? '');

  rna2DSequence.forEach(rna2DResidue => {
    let b = createRNAcanvasBase({ rna2DResidue, rna2DClasses });
    rnaCanvasSequence.append(b);
  });

  return rnaCanvasSequence;
}
