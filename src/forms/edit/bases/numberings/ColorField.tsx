import type { App } from 'App';
import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import * as React from 'react';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { ColorPicker } from './ColorPicker';
import { OpacityInput } from './OpacityInput';

export type Props = {
  app: App; // a reference to the whole app

  // the base numberings to edit
  baseNumberings: BaseNumbering[];
};

export function ColorField(props: Props) {
  return (
    <div
      style={{
        marginTop: '9px',
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        alignSelf: 'start',
      }}
    >
      <ColorPicker app={props.app} baseNumberings={props.baseNumberings} />
      <FieldLabel style={{ marginLeft: '10px', cursor: 'text' }} >
        <OpacityInput app={props.app} baseNumberings={props.baseNumberings} />
        Color
      </FieldLabel>
    </div>
  );
}
