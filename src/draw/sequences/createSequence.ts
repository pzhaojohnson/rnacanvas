import { Sequence } from './Sequence';

import * as FromString from './private/fromString';

/**
 * Creates a sequence with a base for each character in the input
 * string.
 *
 * The returned sequence will have an empty string for an ID.
 */
export function createSequence(s: string) {
  let basicSeq = FromString.SequenceDecorator.fromString(s);

  let seq = new Sequence('');
  seq.id = basicSeq.id;
  seq.bases.push(...basicSeq.bases);
  return seq;
}
