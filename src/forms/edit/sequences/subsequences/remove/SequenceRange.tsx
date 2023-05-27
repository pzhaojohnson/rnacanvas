import type { Sequence } from 'Draw/sequences/Sequence';

import * as React from 'react';

// the underlying sequence range component
import { DisplayableSequenceRange as _SequenceRange } from 'Forms/edit/sequences/DisplayableSequenceRange';

export type Props = {
  /**
   * The sequence to show the range of.
   * (May be undefined if the drawing has no sequences.)
   */
  sequence: Sequence | undefined;
};

export function SequenceRange(props: Props) {
  return (
    props.sequence ? (
      <_SequenceRange
        sequence={props.sequence}
        style={{ marginTop: '10px', marginLeft: '2px' }}
      />
    ) : (
      null
    )
  );
}
