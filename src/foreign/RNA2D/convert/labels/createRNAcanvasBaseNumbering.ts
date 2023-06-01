import type { LabelWrapper as RNA2DLabel } from 'Foreign/RNA2D/wrappers/labels/LabelWrapper';

import type { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import type { Sequence as RNAcanvasSequence } from 'Draw/sequences/Sequence';

import { BaseNumbering as RNAcanvasBaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import { createRNAcanvasBaseNumberingText } from './contents/createRNAcanvasBaseNumberingText';

import { createRNAcanvasBaseNumberingLine } from './lines/createRNAcanvasBaseNumberingLine';

export type Args = {
  rna2DLabel: RNA2DLabel;

  rna2DClasses?: RNA2DClass[];

  /**
   * The sequence containing the base that the RNAcanvas base numbering
   * will be for.
   */
  rnaCanvasSequence: RNAcanvasSequence;
};

export function createRNAcanvasBaseNumbering(args: Args) {
  let { rna2DLabel, rna2DClasses, rnaCanvasSequence } = args;

  let text = createRNAcanvasBaseNumberingText({
    rna2DLabelContent: rna2DLabel.labelContent,
    rna2DClasses,
  });

  let line = createRNAcanvasBaseNumberingLine({
    rna2DLabelLine: rna2DLabel.labelLine,
    rna2DClasses,
  });

  let p = rna2DLabel.residueIndex + 1;
  let base = rnaCanvasSequence.getBaseAtPosition(p);

  if (!base) {
    throw new Error(`No base at position ${p}.`);
  }

  let baseCenter = base.center();

  return new RNAcanvasBaseNumbering(text, line, baseCenter);
}
