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

export function parseBaseColors
(
  args: Args,
): ReturnType<typeof createSVGColor>[]
{
  // just in case something throws
  try {
    let { drawingFileContents } = args;

    let lines = splitLines(drawingFileContents);

    let baseColorsLine = lines.find(line => line.startsWith('base_colors'));

    if (!baseColorsLine) {
      return [];
    }

    let baseColorsData = baseColorsLine.substring('base_colors '.length);

    if (isBlank(baseColorsData)) {
      return [];
    }

    // is delimited by commas
    let baseColorNames = baseColorsData.split(',');

    let baseColors: ReturnType<typeof createSVGColor>[] = [];

    // important to maintain the positions of base colors in the list
    // (means sometimes including undefined values)
    baseColorNames.forEach(name => {
      let color = name ? createSVGColor({ cssName: name }) : undefined;
      baseColors.push(color);
    });

    return baseColors;
  } catch (error) {
    console.error(error);
    console.error('Unable to parse base colors.');
    return [];
  }
}
