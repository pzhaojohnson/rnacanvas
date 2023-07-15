import * as React from 'react';

import { DottedNote } from 'Forms/notes/DottedNote';

/**
 * Explains how the form works.
 */
export function WhatHappensNote() {
  let style: React.CSSProperties = {
    marginTop: '18px',
  };

  return (
    <DottedNote style={style} >
      Bases with the specified text will be selected and can then be edited.
    </DottedNote>
  );
}
