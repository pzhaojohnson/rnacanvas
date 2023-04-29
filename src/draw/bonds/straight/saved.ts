import type { Drawing } from 'Draw/Drawing';
import { PrimaryBond } from './PrimaryBond';
import { secondaryBondTypes } from './SecondaryBond';
import { SecondaryBond } from './SecondaryBond';
import { findLineByUniqueId } from 'Draw/saved/svg';
import type { Base } from 'Draw/bases/Base';
import { basesByUniqueId } from 'Draw/saved/bases';
import { fromSpecifications as strungElementsFromSpecifications } from 'Draw/bonds/strung/save/fromSpecifications';
import { values } from './values';

export type SavedState = { [key: string]: unknown }

function assertIsSavedStraightBond(saved: SavedState): void | never {
  if (saved.className != 'StraightBond') {
    throw new Error('Saved state is not for a straight bond.');
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

export function addSavedPrimaryBonds(drawing: Drawing, saveds: SavedState[]): PrimaryBond[] | never {
  let pbs: PrimaryBond[] = [];
  let bases = basesByUniqueId(drawing);
  saveds.forEach(saved => {
    assertIsSavedStraightBond(saved);
    let line = findLineByUniqueId(drawing.svg, saved.lineId);
    let base1 = getBaseById(bases, saved.baseId1);
    let base2 = getBaseById(bases, saved.baseId2);
    let pb = new PrimaryBond(line, base1, base2);

    pb.strungElements = strungElementsFromSpecifications({
      svg: drawing.svg,
      specifications: saved.strungElements,
    });

    pbs.push(pb);
  });
  drawing.primaryBonds.push(...pbs);
  return pbs;
}

function updateRecommendedDefaultsForSecondaryBonds(addedSecondaryBonds: SecondaryBond[]) {
  let reversed = [...addedSecondaryBonds].reverse();
  secondaryBondTypes.forEach(t => {
    // finds the last added secondary bond of the given type
    let sb = reversed.find(sb => sb.type == t);
    if (sb) {
      SecondaryBond.recommendedDefaults[t] = values(sb);
    }
  });
}

export function addSavedSecondaryBonds(drawing: Drawing, saveds: SavedState[]): SecondaryBond[] | never {
  let sbs: SecondaryBond[] = [];
  let bases = basesByUniqueId(drawing);
  saveds.forEach(saved => {
    assertIsSavedStraightBond(saved);
    let line = findLineByUniqueId(drawing.svg, saved.lineId);
    let base1 = getBaseById(bases, saved.baseId1);
    let base2 = getBaseById(bases, saved.baseId2);
    let sb = new SecondaryBond(line, base1, base2);

    sb.strungElements = strungElementsFromSpecifications({
      svg: drawing.svg,
      specifications: saved.strungElements,
    });

    sbs.push(sb);
  });
  drawing.secondaryBonds.push(...sbs);
  updateRecommendedDefaultsForSecondaryBonds(sbs);
  return sbs;
}
