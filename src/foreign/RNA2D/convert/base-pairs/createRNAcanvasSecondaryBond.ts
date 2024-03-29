import type { BasePairWrapper as RNA2DBasePair } from 'Foreign/RNA2D/wrappers/base-pairs/BasePairWrapper';

import type { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import type { Sequence as RNAcanvasSequence } from 'Draw/sequences/Sequence';

import { createSecondaryBond as _createRNAcanvasSecondaryBond } from 'Draw/bonds/straight/createSecondaryBond';

let rnaCanvasSecondaryBondDefaults = {
  line: {
    'stroke': '#000000',
    'stroke-width': 2,
    'stroke-opacity': 1,
    'stroke-linecap': 'butt',
    'stroke-dasharray': 'none',
  },
};

export type Args = {
  rna2DBasePair: RNA2DBasePair;

  rna2DClasses?: RNA2DClass[];

  /**
   * The sequence that the bases of the base-pair are in.
   */
  rnaCanvasSequence: RNAcanvasSequence;
};

export function createRNAcanvasSecondaryBond(args: Args) {
  let { rna2DBasePair, rna2DClasses, rnaCanvasSequence } = args;

  let p1 = rna2DBasePair.residueIndex1 + 1;
  let p2 = rna2DBasePair.residueIndex2 + 1;

  let b1 = rnaCanvasSequence.getBaseAtPosition(p1);
  let b2 = rnaCanvasSequence.getBaseAtPosition(p2);

  if (!b1) {
    throw new Error(`No base at position ${p1}.`);
  } else if (!b2) {
    throw new Error(`No base at position ${p2}.`);
  }

  let rnaCanvasSecondaryBond = _createRNAcanvasSecondaryBond({
    base1: b1,
    base2: b2,
  });

  let defaults = rnaCanvasSecondaryBondDefaults;
  rnaCanvasSecondaryBond.line.attr(defaults.line);

  // apply RNA 2D classes after applying defaults
  rna2DClasses?.forEach(c => {
    try {
      if (rna2DBasePair.classes.includes(c.name)) {
        rnaCanvasSecondaryBond.line.attr(c.styleProperties);
      }
    } catch (error) {
      console.error(error);
      console.error(`Invalid RNA 2D class: ${c}.`);
    }
  });

  rnaCanvasSecondaryBond.reposition();

  return rnaCanvasSecondaryBond;
}
