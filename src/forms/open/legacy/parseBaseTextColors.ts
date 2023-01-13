import { splitLines } from 'Parse/splitLines';

import { isBlank } from 'Parse/isBlank';

import { createSVGColor } from './createSVGColor';

/**
 * The contents of a legacy drawing file.
 */
export type LegacyDrawingFileContents = string;

export type Args = (
  { drawingFileContents: LegacyDrawingFileContents }
);

export function parseBaseTextColors
(
  args: Args,
): ReturnType<typeof createSVGColor>[]
{
  // just in case something throws
  try {
    let { drawingFileContents } = args;

    let lines = splitLines(drawingFileContents);

    let baseTextColorsLine = lines.find(
      line => line.startsWith('base_colors')
    );

    if (!baseTextColorsLine) {
      return [];
    }

    let baseTextColorsData = (
      baseTextColorsLine.substring('base_colors '.length)
    );

    if (isBlank(baseTextColorsData)) {
      return [];
    }

    // is delimited by commas
    let baseTextColorNames = baseTextColorsData.split(',');

    let baseTextColors: ReturnType<typeof createSVGColor>[] = [];

    // must maintain the positions of base text colors in the list
    // (means sometimes including undefined values)
    baseTextColorNames.forEach(name => {
      let color = name ? createSVGColor({ cssName: name }) : undefined;
      baseTextColors.push(color);
    });

    return baseTextColors;
  } catch (error) {
    console.error(error);
    console.error('Unable to parse base text colors.');
    return [];
  }
}
