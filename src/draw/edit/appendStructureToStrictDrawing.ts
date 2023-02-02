import type { StrictDrawing } from 'Draw/strict/StrictDrawing';
import {
  appendStructure,
  Structure,
  addTertiaryBonds,
} from './addStructure';
import PerBaseStrictLayoutProps from 'Draw/strict/layout/PerBaseStrictLayoutProps';
import type { Base } from 'Draw/bases/Base';
import { radiateStems } from 'Draw/strict/layout/radiateStems';
import { isTree } from 'Partners/isTree';
import { treeify } from 'Partners/treeify';
import type { Sequence } from 'Draw/sequences/Sequence';

function _appendPerBaseLayoutProps(sd: StrictDrawing, structure: Structure) {
  let seq = sd.drawing.getSequenceById(structure.id) as Sequence;
  if (seq.length == 0) {
    return;
  }
  let b1 = seq.getBaseAtPosition(1) as Base;
  let start = sd.drawing.overallPositionOfBase(b1);
  let perBaseProps = sd.perBaseLayoutProps();
  if (!perBaseProps) {
    perBaseProps = [];
  }
  while (perBaseProps.length < start - 1) {
    perBaseProps.push(new PerBaseStrictLayoutProps());
  }
  seq.bases.forEach((b, i) => {
    let p = i + 1;
    let op = start + p - 1;
    perBaseProps[op - 1] = new PerBaseStrictLayoutProps();
  });
  sd.setPerBaseLayoutProps(perBaseProps);
}

function _radiateStructure(sd: StrictDrawing, structure: Structure) {
  let secondaryPartners = structure.secondaryPartners;
  if (!secondaryPartners) {
    return;
  }
  if (!isTree(secondaryPartners)) {
    secondaryPartners = treeify(secondaryPartners);
  }
  let stretches3 = radiateStems(secondaryPartners);
  let seq = sd.drawing.getSequenceById(structure.id) as Sequence;
  if (seq.length == 0) {
    return;
  }
  let b1 = seq.getBaseAtPosition(1) as Base;
  let start = sd.drawing.overallPositionOfBase(b1);
  let perBaseProps = sd.perBaseLayoutProps();
  seq.bases.forEach((b, i) => {
    let p = i + 1;
    let op = start + p - 1;
    perBaseProps[op - 1].stretch3 = stretches3[p - 1];
  });
  sd.setPerBaseLayoutProps(perBaseProps);
}

/**
 * Returns true if the structure was successfully appended.
 */
export function appendStructureToStrictDrawing(sd: StrictDrawing, structure: Structure): boolean {
  let tertiaryPartners = structure.tertiaryPartners;
  structure = { ...structure, tertiaryPartners: undefined };
  let appended = appendStructure(sd.drawing, structure);
  if (!appended) {
    return false;
  }
  _appendPerBaseLayoutProps(sd, structure);
  _radiateStructure(sd, structure);
  sd.updateLayout();
  if (tertiaryPartners) {
    addTertiaryBonds(sd.drawing, structure.id, tertiaryPartners);
  }
  return true;
}

export default appendStructureToStrictDrawing;

export {
  Structure,
};
