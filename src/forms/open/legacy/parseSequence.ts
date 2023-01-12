import { splitLines } from 'Parse/splitLines';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingFileContents = string;

export type Args = (
  { drawingFileContents: LegacyDrawingFileContents }
);

/**
 * Returns undefined if the sequence cannot be parsed.
 */
export function parseSequence(args: Args): string | undefined {
  // just in case something throws
  try {
    let { drawingFileContents } = args;

    let lines = splitLines(drawingFileContents);

    if (lines.length < 2) {
      return undefined;
    }

    return lines[1];
  } catch (error) {
    console.error(error);
    console.error('Unable to parse sequence.');
    return undefined;
  }
}
