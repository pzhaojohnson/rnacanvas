import { Sequence } from './Sequence';

import * as FromString from './fromString';

export function createSequence(s: string): Sequence {
  return FromString.SequenceDecorator.fromString(s);
}
