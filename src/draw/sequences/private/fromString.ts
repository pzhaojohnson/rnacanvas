import { Sequence } from './Sequence';

import type { Base } from 'Draw/bases/Base';

import { createBase } from 'Draw/bases/createBase';

export class SequenceDecorator {
  /**
   * Creates a base for each character in the string.
   *
   * The returned sequence will have an empty string for an ID.
   */
  static fromString(s: string): Sequence {
    let bases: Base[] = [];

    for (let i = 0; i < s.length; i++) {
      let b = createBase(s.charAt(i));
      bases.push(b);
    }

    return new Sequence({ bases, id: '' });
  }
}
