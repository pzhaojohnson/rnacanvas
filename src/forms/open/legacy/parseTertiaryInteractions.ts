import { splitLines } from 'Parse/splitLines';

import { isBlank } from 'Parse/isBlank';

import { parseTertiaryInteraction } from './parseTertiaryInteraction';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingString = string;

export type Args = (
  { drawingString: LegacyDrawingString }
);

export function parseTertiaryInteractions
(
  args: Args,
): ReturnType<typeof parseTertiaryInteraction>[]
{
  // just in case something throws
  try {
    let { drawingString } = args;
    let lines = splitLines(drawingString);

    let tertiaryInteractionsLine = lines.find(
      line => line.startsWith('tert_inters')
    );

    if (!tertiaryInteractionsLine) {
      return [];
    }

    // contains all tertiary interaction definitions
    let tertiaryInteractionsString = (
      tertiaryInteractionsLine.split(' ')[1] ?? ''
    );

    if (isBlank(tertiaryInteractionsString)) {
      return [];
    }

    let parsed: ReturnType<typeof parseTertiaryInteraction>[] = [];

    tertiaryInteractionsString.split(';').forEach(string => {
      parsed.push(parseTertiaryInteraction(string));
    });

    return parsed;
  } catch (error) {
    console.error(error);
    console.error('Unable to parse tertiary interactions.');
    return [];
  }
}
