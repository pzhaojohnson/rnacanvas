import type { Drawing } from 'Draw/Drawing';
import { findPathByUniqueId } from 'Draw/saved/svg';
import { basesByUniqueId } from 'Draw/saved/bases';
import type { Base } from 'Draw/bases/Base';
import { TertiaryBond } from './TertiaryBond';
import { fromSpecifications as strungElementsFromSpecifications } from 'Draw/bonds/strung/save/fromSpecifications';

export type SavedState = { [key: string]: unknown }

function assertIsSavedQuadraticBezierBond(saved: SavedState): void | never {
  if (saved.className != 'QuadraticBezierBond') {
    throw new Error('Saved state is not for a quadratic bezier bond.');
  }
}

function getBaseById(bases: Map<string, Base>, id: unknown): Base | never {
  if (typeof id != 'string') {
    throw new Error('Base ID is not a string.');
  }
  let b = bases.get(id);
  if (!b) {
    throw new Error(`No base has the ID: ${id}.`);
  }
  return b;
}

export function addSavedTertiaryBonds(drawing: Drawing, saveds: SavedState[]): TertiaryBond[] | never {
  let tbs: TertiaryBond[] = [];
  let bases = basesByUniqueId(drawing);
  saveds.forEach(saved => {
    assertIsSavedQuadraticBezierBond(saved);
    let path = findPathByUniqueId(drawing.svg, saved.pathId);
    let base1 = getBaseById(bases, saved.baseId1);
    let base2 = getBaseById(bases, saved.baseId2);
    let tb = new TertiaryBond(path, base1, base2);

    tb.strungElements = strungElementsFromSpecifications({
      svg: drawing.svg,
      specifications: saved.strungElements,
    });

    tbs.push(tb);
  });
  drawing.tertiaryBonds.push(...tbs);

  return tbs;
}
