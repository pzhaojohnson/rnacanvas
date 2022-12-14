import { Rna2drawer1 } from './parseRna2drawer1';
import type { StrictDrawing } from 'Draw/strict/StrictDrawing';
import { pixelsToPoints } from 'Export/units';
import { addTertiaryBond } from 'Draw/bonds/curved/add';
import { addCircleOutline } from 'Draw/bases/annotate/circle/add';
import {
  sendToBack as sendOutlineToBack,
} from 'Draw/bases/annotate/circle/z';
import { updateBaseNumberings } from 'Draw/sequences/updateBaseNumberings';
import { orientBaseNumberings } from 'Draw/bases/numberings/orient';

function addTertiaryInteractions(sd: StrictDrawing, rna2drawer1: Rna2drawer1) {
  let seq = sd.drawing.getSequenceById(rna2drawer1.sequenceId);
  if (seq) {
    rna2drawer1.tertiaryInteractions.forEach(ti => {
      let p51 = Math.min(...ti.side1);
      let p31 = Math.max(...ti.side1);
      let p52 = Math.min(...ti.side2);
      let p32 = Math.max(...ti.side2);
      let size1 = p31 - p51 + 1;
      let size2 = p32 - p52 + 1;
      for (let i = 0; i < Math.max(size1, size2); i++) {
        let p1 = Math.min(p51 + i, p31);
        let p2 = Math.max(p32 - i, p52);
        let b5 = seq?.getBaseAtPosition(Math.min(p1, p2));
        let b3 = seq?.getBaseAtPosition(Math.max(p1, p2));
        if (b5 && b3) {
          let tb = addTertiaryBond(sd.drawing, b5, b3);
          tb.path.attr({
            'stroke': ti.color.toHex(),
            'stroke-width': 1.5,
            'stroke-opacity': 0.25,
          });
        }
      }
    });
  }
}

function addBaseColors(sd: StrictDrawing, rna2drawer1: Rna2drawer1) {
  let seq = sd.drawing.getSequenceById(rna2drawer1.sequenceId);
  if (seq) {
    seq.bases.forEach((b, i) => {
      let p = i + 1;
      let color = rna2drawer1.baseColors[p - 1];
      if (color) {
        b.text.attr({ 'fill': color.toHex() });
      }
    });
  }
}

function addBaseOutlines(sd: StrictDrawing, rna2drawer1: Rna2drawer1) {
  let seq = sd.drawing.getSequenceById(rna2drawer1.sequenceId);
  if (seq) {
    seq.bases.forEach((b, i) => {
      let p = i + 1;
      let outline = rna2drawer1.baseOutlines[p - 1];
      if (outline) {
        addCircleOutline(b);
        if (b.outline) {
          sendOutlineToBack(b.outline);
          let fs = b.text.attr('font-size');
          b.outline.circle.attr({
            'r': outline.relativeRadius * pixelsToPoints(typeof fs == 'number' ? fs : 9),
            'stroke': outline.stroke.toHex(),
            'stroke-width': outline.strokeWidth,
            'stroke-opacity': outline.strokeOpacity,
            'fill': outline.fill.toHex(),
            'fill-opacity': outline.fillOpacity,
          });
        }
      }
    });
  }
}

export function addRna2drawer1(sd: StrictDrawing, rna2drawer1: Rna2drawer1) {
  sd.appendStructure({
    id: rna2drawer1.sequenceId,
    characters: rna2drawer1.characters,
    secondaryPartners: rna2drawer1.secondaryStructure.secondaryPartners,
    tertiaryPartners: rna2drawer1.secondaryStructure.tertiaryPartners,
  });
  addTertiaryInteractions(sd, rna2drawer1);
  let seq = sd.drawing.getSequenceById(rna2drawer1.sequenceId);
  if (seq) {
    updateBaseNumberings(seq, {
      offset: rna2drawer1.numberingOffset,
      increment: rna2drawer1.numberingIncrement,
      anchor: rna2drawer1.numberingAnchor,
    });
  }
  orientBaseNumberings(sd.drawing);
  addBaseColors(sd, rna2drawer1);
  addBaseOutlines(sd, rna2drawer1);
}

export default addRna2drawer1;
