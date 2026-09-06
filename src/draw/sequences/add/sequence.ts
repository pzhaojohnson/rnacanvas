import type { Drawing } from 'Draw/Drawing';
import { Sequence } from 'Draw/sequences/Sequence';
import { insertSubsequence } from './subsequence';
import { updateBaseNumberings } from 'Draw/sequences/updateBaseNumberings';

export type SequenceProps = {
  id: string;

  // a base will be created for each character
  characters: string;
}

export function appendSequence(drawing: Drawing, props: SequenceProps): Sequence {
  let seq = new Sequence(props.id);

  drawing.sequences.push(seq);

  insertSubsequence(drawing, {
    parent: seq,
    characters: props.characters,
    start: 1,
  });

  let defaultNumbering = { offset: 0, increment: 20, anchor: 0 };

  // don't add numberings when using AES default values
  if (defaultValues?.toUpperCase() != 'AES') {
    updateBaseNumberings(seq, defaultNumbering);
  }

  return seq;
}

const defaultValues = (new URL(window.location.href)).searchParams.get('default_values');
