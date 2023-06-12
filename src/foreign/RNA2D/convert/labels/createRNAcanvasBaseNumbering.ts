import type { LabelWrapper as RNA2DLabel } from 'Foreign/RNA2D/wrappers/labels/LabelWrapper';

import type { SchemaClassWrapper as RNA2DClass } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { BaseNumbering as RNAcanvasBaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import { createRNAcanvasBaseNumberingText } from './contents/createRNAcanvasBaseNumberingText';

import { createRNAcanvasBaseNumberingLine } from './lines/createRNAcanvasBaseNumberingLine';

export type Args = {
  rna2DLabel: RNA2DLabel;

  rna2DClasses?: RNA2DClass[];
};

export function createRNAcanvasBaseNumbering(args: Args) {
  let { rna2DLabel, rna2DClasses } = args;

  let text = createRNAcanvasBaseNumberingText({
    rna2DLabelContent: rna2DLabel.labelContent,
    rna2DClasses,
  });

  let line = createRNAcanvasBaseNumberingLine({
    rna2DLabelLine: rna2DLabel.labelLine,
    rna2DClasses,
  });

  let baseCenter = { x: 0, y: 0 };

  return new RNAcanvasBaseNumbering(text, line, baseCenter);
}
