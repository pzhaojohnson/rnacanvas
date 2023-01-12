import { splitLines } from 'Parse/splitLines';

import { isBlank } from 'Parse/isBlank';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingFileContents = string;

export type Args = (
  { drawingFileContents: LegacyDrawingFileContents }
);

/**
 * Returns undefined if the sequence ID cannot be parsed.
 */
export function parseSequenceId(args: Args): string | undefined {
  // just in case something throws
  try {
    let { drawingFileContents } = args;

    let lines = splitLines(drawingFileContents);

    // is the first line
    let sequenceIdLine = lines[0] ?? '';

    if (isBlank(sequenceIdLine)) {
      return undefined;
    }

    // sequence ID line supposed to start with ">"
    let sequenceId = sequenceIdLine.startsWith('>') ? (
      sequenceIdLine.substring(1)
    ) : (
      sequenceIdLine
    );

    // trim any leading or trailing whitespace
    sequenceId = sequenceId.trim();

    if (isBlank(sequenceId)) {
      return undefined;
    }

    return sequenceId;
  } catch (error) {
    console.error(error);
    console.error('Unable to parse sequence ID.');
    return undefined;
  }
}
