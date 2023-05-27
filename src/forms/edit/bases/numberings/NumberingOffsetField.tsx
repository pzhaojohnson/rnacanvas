import type { App } from 'App';

import * as React from 'react';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { NumberingOffsetInput } from 'Forms/edit/sequences/NumberingOffsetInput';

export type Props = {
  app: App; // a reference to the whole app
};

export function NumberingOffsetField(props: Props) {
  return (
    <FieldLabel
      style={{
        margin: '10px 8px 0 7px', alignSelf: 'start',
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        cursor: 'text',
      }}
    >
      <NumberingOffsetInput
        app={props.app}
        sequence={props.app.strictDrawing.layoutSequence()}
      />
      <span style={{ marginLeft: '8px' }} >
        Offset
      </span>
    </FieldLabel>
  );
}
