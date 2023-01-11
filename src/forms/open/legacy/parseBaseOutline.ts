import { isBlank } from 'Parse/isBlank';

import { createSVGColor } from './createSVGColor';

/**
 * A string defining a base outline found in a legacy drawing file.
 */
export type BaseOutlineString = string;

/**
 * Note that a base outline string contains more data than is parsed.
 */
export type BaseOutlineData = {
  stroke?: ReturnType<typeof createSVGColor>;
  fill?: ReturnType<typeof createSVGColor>;
};

/**
 * Returns undefined for an invalid base outline string.
 */
export function parseBaseOutline
(
  baseOutlineString: BaseOutlineString,
): BaseOutlineData | undefined
{
  // just in case something throws
  try {
    if (isBlank(baseOutlineString)) {
      return undefined;
    }

    let items = baseOutlineString.split(',');

    let strokeName = items[0] ?? '';
    let fillName = items[2] ?? '';

    let stroke = strokeName ? (
      createSVGColor({ cssName: strokeName })
    ) : undefined;

    let fill = fillName ? (
      createSVGColor({ cssName: fillName })
    ) : undefined;

    return { stroke, fill };
  } catch (error) {
    console.error(error);
    console.error('Unable to parse base outline.');
    return undefined;
  }
}
