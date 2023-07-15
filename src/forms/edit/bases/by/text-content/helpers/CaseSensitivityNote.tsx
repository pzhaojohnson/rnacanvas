import * as React from 'react';

import { DottedNote } from 'Forms/notes/DottedNote';

export function CaseSensitivityNote() {
  let style: React.CSSProperties = {
    marginTop: '10px',
  };

  return (
    <DottedNote style={style} >
      Is case-sensitive.
    </DottedNote>
  );
}
