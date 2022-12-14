import type { Drawing } from 'Draw/Drawing';
import { Partners } from 'Partners/Partners';
import type { Base } from 'Draw/bases/Base';
import { addSecondaryBond } from 'Draw/bonds/straight/add';
import { addTertiaryBond } from 'Draw/bonds/curved/add';

function _basePairs(drawing: Drawing, sequenceId: string, partners: Partners): [Base, Base][] {
  let pairs = [] as [Base, Base][];
  let seq = drawing.getSequenceById(sequenceId);
  partners.forEach((q, i) => {
    let p = i + 1;
    if (typeof q == 'number' && p < q) {
      let b5 = seq?.getBaseAtPosition(p);
      let b3 = seq?.getBaseAtPosition(q);
      if (b5 && b3) {
        pairs.push([b5, b3]);
      }
    }
  });
  return pairs;
}

export function addSecondaryBonds(drawing: Drawing, sequenceId: string, partners: Partners) {
  let pairs = _basePairs(drawing, sequenceId, partners);
  pairs.forEach(p => {
    addSecondaryBond(drawing, p[0], p[1]);
  });
}

export function addTertiaryBonds(drawing: Drawing, sequenceId: string, partners: Partners) {
  let pairs = _basePairs(drawing, sequenceId, partners);
  pairs.forEach(p => {
    addTertiaryBond(drawing, p[0], p[1]);
  });
}

export interface Structure {
  id: string;
  characters: string;
  secondaryPartners?: Partners;
  tertiaryPartners?: Partners;
}

export function appendStructure(drawing: Drawing, structure: Structure): boolean {
  let appended = drawing.appendSequence(structure.id, structure.characters);
  if (!appended) {
    return false;
  }
  if (structure.secondaryPartners) {
    addSecondaryBonds(drawing, structure.id, structure.secondaryPartners);
  }
  if (structure.tertiaryPartners) {
    addTertiaryBonds(drawing, structure.id, structure.tertiaryPartners);
  }
  return true;
}
