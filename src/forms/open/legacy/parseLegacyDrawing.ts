import { parseSequenceId } from './parseSequenceId';
import { parseSequence } from './parseSequence';
import { parseSecondaryStructure } from './parseSecondaryStructure';
import { parseTertiaryInteractions } from './parseTertiaryInteractions';
import { parseSequenceNumbering } from './parseSequenceNumbering';
import { parseBaseTextColors } from './parseBaseTextColors';
import { parseBaseOutlines } from './parseBaseOutlines';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingFileContents = string;

export type LegacyDrawingData = {
  sequenceId?: ReturnType<typeof parseSequenceId>;
  sequence?: ReturnType<typeof parseSequence>;
  secondaryStructure?: ReturnType<typeof parseSecondaryStructure>;
  tertiaryInteractions?: ReturnType<typeof parseTertiaryInteractions>;
  sequenceNumbering?: ReturnType<typeof parseSequenceNumbering>;
  baseTextColors?: ReturnType<typeof parseBaseTextColors>;
  baseOutlines?: ReturnType<typeof parseBaseOutlines>;
};

export type Args = (
  { drawingFileContents: LegacyDrawingFileContents }
);

export function parseLegacyDrawing(args: Args): LegacyDrawingData {
  let { drawingFileContents } = args;

  return {
    sequenceId: parseSequenceId({ drawingFileContents }),
    sequence: parseSequence({ drawingFileContents }),
    secondaryStructure: parseSecondaryStructure({ drawingFileContents }),
    tertiaryInteractions: parseTertiaryInteractions({ drawingFileContents }),
    sequenceNumbering: parseSequenceNumbering({ drawingFileContents }),
    baseTextColors: parseBaseTextColors({ drawingFileContents }),
    baseOutlines: parseBaseOutlines({ drawingFileContents }),
  };
}
