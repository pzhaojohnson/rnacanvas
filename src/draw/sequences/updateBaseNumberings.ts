import type { Sequence } from './Sequence';
import { addNumbering } from 'Draw/bases/numberings/add';
import { removeNumbering } from 'Draw/bases/numberings/add';

export type SequenceNumbering = {
  offset: number;
  increment: number;
  anchor: number;
}

// does not reorient base numberings after updating them
export function updateBaseNumberings(seq: Sequence, sn: SequenceNumbering) {
  seq.bases.forEach((b, i) => {
    let p = i + 1;

    // remove any previous numbering
    removeNumbering(b);

    if ((p - sn.anchor) % sn.increment == 0) {
      addNumbering(b, p + sn.offset);
    }
  });
}
