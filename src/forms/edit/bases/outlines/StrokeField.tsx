import type { App } from 'App';
import type { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import * as React from 'react';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { StrokePicker } from './StrokePicker';
import { StrokeOpacityInput } from './StrokeOpacityInput';

export type Props = {
  app: App; // a reference to the whole app

  outlines: CircleBaseOutline[]; // the base outlines to edit
};

export function StrokeField(props: Props) {
  return (
    <div
      style={{
        marginTop: '8px', alignSelf: 'start',
        display: 'flex', flexDirection: 'row', alignItems: 'center',
      }}
    >
      <StrokePicker {...props} />
      <div style={{ width: '10px' }} />
      <FieldLabel style={{ cursor: 'text' }} >
        <StrokeOpacityInput {...props} />
        <span style={{ marginLeft: '8px' }}>
          Line Color
        </span>
      </FieldLabel>
    </div>
  );
}
