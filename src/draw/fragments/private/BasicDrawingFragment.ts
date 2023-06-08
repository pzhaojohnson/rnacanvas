import * as SVG from '@svgdotjs/svg.js';

import type { Sequence } from 'Draw/sequences/Sequence';

import type { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

import type { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

/**
 * Contains the data of a drawing fragment.
 */
export class BasicDrawingFragment {
  readonly svg = new SVG.Svg();

  readonly sequences: Sequence[] = [];

  readonly primaryBonds: PrimaryBond[] = [];

  readonly secondaryBonds: SecondaryBond[] = [];
}
