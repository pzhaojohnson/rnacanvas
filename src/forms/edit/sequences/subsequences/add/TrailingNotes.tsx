import * as React from 'react';
import { DottedNote } from 'Forms/notes/DottedNote';

export function InsertSubsequenceNote() {
  return (
    <DottedNote style={{ marginTop: '20px' }} >
      The subsequence will be inserted beginning at the position to insert at.
    </DottedNote>
  );
}

export function BaseNumberingNote() {
  return (
    <DottedNote style={{ marginTop: '8px' }} >
      Base numbering must be updated manually after adding a subsequence.
    </DottedNote>
  );
}
