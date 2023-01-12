import { splitLines } from 'Parse/splitLines';

import { isBlank } from 'Parse/isBlank';

import { isNullish } from 'Values/isNullish';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingFileContents = string;

const offsetLineTag = 'misc_seq_num_offset';
const incrementLineTag = 'misc_numbering_increment';
const anchorLineTag = 'misc_numbering_start';

/**
 * Parses a property of a legacy drawing that is an integer.
 *
 * Returns undefined if unable to parse the property.
 */
function parseIntegerProperty
(
  args: {
    drawingFileContents: LegacyDrawingFileContents,
    lineTag: string,
  },
): number | undefined
{
  let { drawingFileContents, lineTag } = args;

  let lines = splitLines(drawingFileContents);

  let propertyLine = lines.find(line => line.startsWith(lineTag));

  if (!propertyLine) {
    return undefined;
  }

  // add one to account for space character after line tag
  let propertyString = propertyLine.substring(lineTag.length + 1);

  if (isBlank(propertyString)) {
    return undefined;
  }

  let property = Number.parseFloat(propertyString);

  if (!Number.isFinite(property)) {
    return undefined;
  }

  // expected to be an integer
  property = Math.floor(property);

  return property;
}

/**
 * Properties that describe how the sequence of a legacy drawing is
 * numbered.
 */
export type SequenceNumbering = {
  offset?: number;
  increment?: number;
  anchor?: number;
};

export type Args = (
  { drawingFileContents: LegacyDrawingFileContents }
);

/**
 * Returns undefined if the sequence numbering cannot be parsed.
 */
export function parseSequenceNumbering
(
  args: Args,
): SequenceNumbering | undefined
{
  // just in case something throws
  try {
    let { drawingFileContents } = args;

    let offset = parseIntegerProperty(
      { drawingFileContents, lineTag: offsetLineTag }
    );

    let increment = parseIntegerProperty(
      { drawingFileContents, lineTag: incrementLineTag }
    );

    let anchor = parseIntegerProperty(
      { drawingFileContents, lineTag: anchorLineTag }
    );

    // increment must be positive
    if (!isNullish(increment) && increment < 1) {
      increment = undefined;
    }

    return { offset, increment, anchor };
  } catch (error) {
    console.error(error);
    console.error('Unable to parse sequence numbering.');
    return undefined;
  }
}
