import type { Drawing } from 'Draw/Drawing';
import { Sequence } from 'Draw/sequences/Sequence';
import { Base } from 'Draw/bases/Base';
import { findTextByUniqueId } from 'Draw/saved/svg';
import { isPoint2D as isPoint } from 'Math/points/Point';
import { addSavedCircleHighlighting, addSavedCircleOutline } from 'Draw/bases/outlines/circle/save';
import { addSavedNumbering } from 'Draw/bases/numberings/save';
import { values as baseValues } from 'Draw/bases/values';

export type SavedState = { [key: string]: unknown }

function assertIsSavedSequence(saved: SavedState): void | never {
  if (saved.className != 'Sequence') {
    throw new Error('Saved state is not for a sequence.');
  }
}

function assertIsSavedBase(saved: SavedState): void | never {
  if (saved.className != 'Base') {
    throw new Error('Saved state is not for a base.');
  }
}

function recreateBase(drawing: Drawing, saved: SavedState): Base | never {
  assertIsSavedBase(saved);
  let text = findTextByUniqueId(drawing.svg, saved.textId);
  let center = isPoint(saved.center) ? saved.center : undefined;
  let b = new Base({ text, center });
  if (saved.highlighting) {
    addSavedCircleHighlighting(b, saved.highlighting as SavedState);
  }
  if (saved.outline) {
    addSavedCircleOutline(b, saved.outline as SavedState);
  }
  if (saved.numbering) {
    addSavedNumbering(b, saved.numbering as SavedState);
  }
  return b;
}

export function appendSavedSequence(drawing: Drawing, saved: SavedState): Sequence | never {
  assertIsSavedSequence(saved);

  if (typeof saved.id != 'string') {
    throw new Error('Saved state is missing the ID of the sequence.');
  }
  let seq = new Sequence(saved.id);

  if (!(saved.bases instanceof Array)) {
    throw new Error('Saved state is missing the bases of the sequence.');
  }
  saved.bases.forEach((s: SavedState) => {
    let b = recreateBase(drawing, s);
    seq.bases.push(b);
    Base.recommendedDefaults = baseValues(b);
  });

  drawing.sequences.push(seq);
  return seq;
}
