import type { Partners as PartnersNotation } from 'Partners/Partners';

import { splitLines } from 'Parse/splitLines';

import { parseDotBracket } from 'Parse/parseDotBracket';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingFileContents = string;

export type SecondaryStructure = (
  { partnersNotation: PartnersNotation }
);

export type Args = (
  { drawingFileContents: LegacyDrawingFileContents }
);

/**
 * Returns undefined if the secondary structure cannot be parsed.
 */
export function parseSecondaryStructure
(
  args: Args,
): SecondaryStructure | undefined
{
  // just in case something throws
  try {
    let { drawingFileContents } = args;

    let lines = splitLines(drawingFileContents);

    if (lines.length < 3) {
      return undefined; // missing secondary structure line
    }

    let dotBracket = lines[2];
    let parsed = parseDotBracket(dotBracket);

    if (!parsed) {
      return undefined; // unable to parse secondary structure line
    }

    // there should not be any pseudoknots in the secondary structure
    return { partnersNotation: parsed.secondaryPartners };
  } catch (error) {
    console.error(error);
    console.error('Unable to parse secondary structure.');
    return undefined;
  }
}
