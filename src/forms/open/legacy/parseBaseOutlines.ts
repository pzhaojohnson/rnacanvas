import { splitLines } from 'Parse/splitLines';

import { isBlank } from 'Parse/isBlank';

import { parseBaseOutline } from './parseBaseOutline';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingFileContents = string;

export type Args = (
  { drawingFileContents: LegacyDrawingFileContents }
);

export function parseBaseOutlines
(
  args: Args,
): ReturnType<typeof parseBaseOutline>[]
{
  // just in case something throws
  try {
    let { drawingFileContents } = args;

    let lines = splitLines(drawingFileContents);

    let baseOutlinesLine = lines.find(
      line => line.startsWith('base_outlines')
    );

    if (!baseOutlinesLine) {
      return [];
    }

    let baseOutlinesData = baseOutlinesLine.split(' ')[1] ?? '';

    if (isBlank(baseOutlinesData)) {
      return [];
    }

    let baseOutlineSpecs = baseOutlinesData.split(';');

    let parsed: ReturnType<typeof parseBaseOutline>[] = [];

    baseOutlineSpecs.forEach(spec => {
      parsed.push(parseBaseOutline(spec));
    });

    return parsed;
  } catch (error) {
    console.error(error);
    console.error('Unable to parse base outlines.');
    return [];
  }
}
