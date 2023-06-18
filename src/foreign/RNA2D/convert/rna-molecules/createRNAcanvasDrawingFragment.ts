import type { RNAMoleculeWrapper as RNA2DRNAMolecule } from 'Foreign/RNA2D/wrappers/rna-molecules/RNAMoleculeWrapper';

import type { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { DrawingFragment } from 'Draw/fragments/DrawingFragment';

import { createRNAcanvasSequence } from 'Foreign/RNA2D/convert/sequences/createRNAcanvasSequence';

import { createRNAcanvasBaseNumbering } from 'Foreign/RNA2D/convert/labels/createRNAcanvasBaseNumbering';

import { createRNAcanvasSecondaryBond } from 'Foreign/RNA2D/convert/base-pairs/createRNAcanvasSecondaryBond';

export type Args = {
  rna2DRNAMolecule: RNA2DRNAMolecule;

  rna2DClasses: RNA2DClass[];
};

export function createRNAcanvasDrawingFragment(args: Args) {
  let { rna2DRNAMolecule, rna2DClasses } = args;

  let frag = new DrawingFragment();

  let seq = createRNAcanvasSequence({
    rna2DSequence: rna2DRNAMolecule.sequence,
    rna2DClasses,
  });

  seq.id = rna2DRNAMolecule.name;

  // just try to make a base numbering out of every label
  rna2DRNAMolecule.labels.forEach(rna2DLabel => {
    try {
      let i = rna2DLabel.residueIndex;
      let b = seq.bases[i];
      b.numbering = createRNAcanvasBaseNumbering({
        rna2DLabel,
        rna2DClasses,
        baseCenter: b.getCenter(),
      });
    } catch (error) {
      console.error(error);
      console.error(`Unable to draw RNA 2D label: ${rna2DLabel}.`);
    }
  });

  rna2DRNAMolecule.basePairs.forEach(rna2DBasePair => {
    try {
      frag.appendSecondaryBond(createRNAcanvasSecondaryBond({
        rna2DBasePair,
        rna2DClasses,
        rnaCanvasSequence: seq,
      }));
    } catch (error) {
      console.error(error);
      console.error(`Unable to draw RNA 2D base-pair: ${rna2DBasePair}.`);
    }
  });

  // place sequence on top
  frag.appendSequence(seq);

  return frag;
}
