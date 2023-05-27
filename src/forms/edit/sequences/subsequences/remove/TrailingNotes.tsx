import * as React from 'react';
import { DottedNote } from 'Forms/notes/DottedNote';

export function TrailingNotes() {
  return (
    <div style={{ marginTop: '21px' }} >
      <DottedNote>
        Bases between and including the start and end positions will be removed.
      </DottedNote>
      <DottedNote style={{ marginTop: '10px' }} >
        Base numbering must be updated manually after removing a subsequence.
      </DottedNote>
    </div>
  );
}
