import type { App } from 'App';

import * as React from 'react';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { NumberingAnchorInput } from 'Forms/edit/sequences/NumberingAnchorInput';

export type Props = {
  app: App; // a reference to the whole app
};

export function NumberingAnchorField(props: Props) {
  return (
    <FieldLabel
      style={{
        margin: '8px 8px 0 7px', alignSelf: 'start',
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        cursor: 'text',
      }}
    >
      <NumberingAnchorInput
        app={props.app}
        sequence={props.app.strictDrawing.layoutSequence()}
      />
      <span style={{ marginLeft: '8px' }} >
        Anchor
      </span>
    </FieldLabel>
  );
}
