import { createSVGColor } from './createSVGColor';

/**
 * A string containing the data for a tertiary interaction found in a
 * legacy drawing file.
 */
export type TertiaryInteractionString = string;

/**
 * A side of a tertiary interaction includes the start and end positions
 * and all positions between the start and end positions.
 */
export type TertiaryInteractionSide = {
  /**
   * Start position of the side.
   */
  start: number;

  /**
   * End position of the side.
   */
  end: number;
};

/**
 * Note that tertiary interaction strings contain more data than are
 * parsed.
 */
export type TertiaryInteractionData = {
  side1: TertiaryInteractionSide;
  side2: TertiaryInteractionSide;
  color: ReturnType<typeof createSVGColor>;
};

/**
 * Returns undefined if the tertiary interaction string is invalid.
 */
export function parseTertiaryInteraction
(
  tertiaryInteractionString: TertiaryInteractionString
): TertiaryInteractionData | undefined
{
  // just in case something throws
  try {
    let items = tertiaryInteractionString.split(',');

    let side1String = items[0] ?? '';
    let side2String = items[1] ?? '';

    let side1Items = side1String.split(':');
    let side2Items = side2String.split(':');

    let side1 = {
      start: Number.parseFloat(side1Items[0] ?? ''),
      end: Number.parseFloat(side1Items[1] ?? ''),
    };

    let side2 = {
      start: Number.parseFloat(side2Items[0] ?? ''),
      end: Number.parseFloat(side2Items[1] ?? ''),
    };

    if (!Number.isFinite(side1.start) || !Number.isFinite(side1.end)) {
      return undefined;
    } else if (!Number.isFinite(side2.start) || !Number.isFinite(side2.end)) {
      return undefined;
    }

    let colorName = items[2] ?? 'black'; // default to black
    let color = createSVGColor({ cssName: colorName });

    return { side1, side2, color };
  } catch (error) {
    console.error(error);
    console.error('Unable to parse tertiary interaction.');
    return undefined;
  }
}
