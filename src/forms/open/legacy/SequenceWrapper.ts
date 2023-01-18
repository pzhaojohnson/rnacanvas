import type { Sequence } from 'Draw/sequences/Sequence';

import { updateBaseNumberings } from 'Draw/sequences/updateBaseNumberings';

export type SequenceNumbering = {
  offset?: number;
  increment?: number;
  anchor?: number;
};

export class SequenceWrapper {
  /**
   * The wrapped sequence.
   */
  readonly sequence: Sequence;

  constructor(sequence: Sequence) {
    this.sequence = sequence;
  }

  /**
   * Numbering offset defaults to 0 if not specified.
   *
   * Numbering increment defaults to 20 if not specified.
   *
   * Numbering anchor defaults to the numbering increment or the
   * sequence length (whichever is smaller) if not specified.
   */
  setNumbering(numbering: SequenceNumbering) {
    let offset = numbering.offset ?? 0;
    let increment = numbering.increment ?? 20;

    // guarantee that at least one base is numbered
    let defaultAnchor = Math.min(increment, this.sequence.length);

    let anchor = numbering.anchor ?? defaultAnchor;

    updateBaseNumberings(this.sequence, { offset, increment, anchor });
  }
}
