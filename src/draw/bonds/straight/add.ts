import type { Drawing } from 'Draw/Drawing';
import type { Base } from 'Draw/bases/Base';
import { PrimaryBond } from './PrimaryBond';
import { SecondaryBond } from './SecondaryBond';
import { setValues } from './values';

import { createPrimaryBond } from './createPrimaryBond';

import { createSecondaryBond } from './createSecondaryBond';

// adds a primary bond between bases 1 and 2
export function addPrimaryBond(drawing: Drawing, base1: Base, base2: Base): PrimaryBond {
  let pb = createPrimaryBond({ base1, base2 });
  pb.reposition();
  pb.appendTo(drawing.svg);
  drawing.primaryBonds.push(pb);
  return pb;
}

// adds a secondary bond between bases 1 and 2
export function addSecondaryBond(drawing: Drawing, base1: Base, base2: Base): SecondaryBond {
  let sb = createSecondaryBond({ base1, base2 });
  setValues(sb, SecondaryBond.recommendedDefaults[sb.type]);
  sb.reposition();
  sb.appendTo(drawing.svg);
  drawing.secondaryBonds.push(sb);
  return sb;
}
