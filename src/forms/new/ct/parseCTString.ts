import type { Partners } from 'Partners/Partners';
import { unstructuredPartners } from 'Partners/unstructuredPartners';
import { pair as pairInPartners } from 'Partners/edit';

import { splitLines } from 'Parse/splitLines';
import { nonemptySplitByWhitespace } from 'Parse/nonemptySplitByWhitespace';

import { isNullish } from '@rnacanvas/value-check';
import { isBlank } from 'Parse/isBlank';

import { atIndex } from 'Array/at';

function itemsInLine(line: string): string[] {
  return nonemptySplitByWhitespace(line);
}

function firstItemInLineIsNumber(line: string): boolean {
  let items = itemsInLine(line);
  let firstItem: string | undefined = atIndex(items, 0);
  return (
    !isNullish(firstItem)
    && Number.isFinite(Number.parseFloat(firstItem))
  );
}

function pruneLines(lines: string[]): string[] {
  // find the index of the first header line
  // (the first header line is the first line that starts with a number)
  let i = 0;
  while (i < lines.length && !firstItemInLineIsNumber(lines[i])) {
    i++;
  }

  // remove all lines before the first header line
  lines = lines.slice(i);

  // remove all blank lines
  lines = lines.filter(line => !isBlank(line));

  return lines;
}

function parseSequenceId(prunedLines: string[]): string {
  let headerLine: string | undefined = atIndex(prunedLines, 0);
  if (isNullish(headerLine)) {
    return 'Structure';
  }

  let items = itemsInLine(headerLine);

  let secondItem: string | undefined = atIndex(items, 1);
  if (isNullish(secondItem)) {
    return 'Structure';
  }

  let secondItemIndex = headerLine.indexOf(secondItem);
  if (secondItemIndex < 0) { // should never happen
    return 'Structure';
  }

  let sequenceId = headerLine.substring(secondItemIndex);
  // trim any leading or trailing whitespace
  sequenceId = sequenceId.trim();
  return sequenceId;
}

function parseSequenceLength(prunedLines: string[]): number | never {
  let headerLine: string | undefined = atIndex(prunedLines, 0);
  if (isNullish(headerLine)) {
    throw new Error('Cannot find header line of structure.');
  }

  let items = itemsInLine(headerLine);

  let firstItem: string | undefined = atIndex(items, 0);
  if (isNullish(firstItem)) {
    throw new Error('Header line is missing the sequence length.');
  }

  let sequenceLength = Number.parseFloat(firstItem);
  if (!Number.isFinite(sequenceLength)) {
    throw new Error('Sequence length must be a number.');
  } else if (sequenceLength == 0) {
    throw new Error('Sequence length cannot be zero.');
  } else if (sequenceLength < 0) {
    throw new Error('Sequence length cannot be negative.');
  } else if (!Number.isInteger(sequenceLength)) {
    throw new Error('Sequence length must be an integer.');
  } else {
    return sequenceLength;
  }
}

function parseSequence(prunedLines: string[]): string | never {
  let sequenceLength = parseSequenceLength(prunedLines);

  if (prunedLines.length < sequenceLength + 1) {
    throw new Error('Missing lines for bases.');
  }

  let sequence = '';
  for (let i = 0; i < sequenceLength; i++) {
    let line = prunedLines[i + 1];
    let items = itemsInLine(line);
    let character: string | undefined = atIndex(items, 1);
    if (isNullish(character) || character.length == 0) {
      throw new Error('Missing characters for bases.');
    } else if (character.length > 1) {
      throw new Error('Each base can only have a single character.');
    } else {
      sequence += character;
    }
  }
  return sequence;
}

/**
 * Given the line for a position in the structure, parses the partner
 * position specified by the line (i.e., the fifth item in the line).
 *
 * Returns undefined if the partner position cannot be parsed or the
 * position that the line is for is unpaired (i.e., the fifth item in
 * the line is zero).
 */
function parsePartner(positionLine: string): number | undefined {
  let items = itemsInLine(positionLine);

  let fifthItem: string | undefined = atIndex(items, 4);
  if (isNullish(fifthItem)) {
    return undefined;
  }

  let q = Number.parseFloat(fifthItem);

  let partnerIsValid = (
    Number.isFinite(q)
    && Number.isInteger(q)
    && q >= 1
  );

  return partnerIsValid ? q : undefined;
}

function parsePartners(prunedLines: string[]): Partners | never {
  let sequenceLength = parseSequenceLength(prunedLines);

  let partners = unstructuredPartners(sequenceLength);
  let maxP = Math.min(sequenceLength, prunedLines.length - 1);
  for (let p = 1; p <= maxP; p++) {
    let line = prunedLines[p];
    let q = parsePartner(line);
    if (!isNullish(q) && q <= sequenceLength) {
      pairInPartners(partners, p, q);
    }
  }
  return partners;
}

/**
 * Returns zero if the numbering offset cannot be parsed or is otherwise
 * invalid.
 */
function parseNumberingOffset(prunedLines: string[]): number {
  let line: string | undefined = atIndex(prunedLines, 1);
  if (isNullish(line)) {
    return 0;
  }

  let items = itemsInLine(line);

  let sixthItem: string | undefined = atIndex(items, 5);
  if (isNullish(sixthItem)) {
    return 0;
  }

  let n = Number.parseFloat(sixthItem);
  if (!Number.isFinite(n)) {
    return 0;
  } else if (!Number.isInteger(n)) {
    return 0;
  } else {
    return n - 1;
  }
}

export type CTData = {
  sequenceId: string;

  /**
   * Each character is for an individual base in the structure.
   */
  sequence: string;

  /**
   * Specifies all base-pairs in the structure.
   */
  partners: Partners;

  /**
   * For the numbering of bases that is displayed to the user.
   */
  numberingOffset: number;
};

/**
 * Throws if the CT string is invalid.
 */
export function parseCTString(ctString: string): CTData | never {
  let lines = splitLines(ctString);
  let prunedLines = pruneLines(lines);

  return {
    sequenceId: parseSequenceId(prunedLines),
    sequence: parseSequence(prunedLines),
    partners: parsePartners(prunedLines),
    numberingOffset: parseNumberingOffset(prunedLines),
  };
}
