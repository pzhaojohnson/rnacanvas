import type { App } from 'App';
import type { Base } from 'Draw/bases/Base';
import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import * as React from 'react';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { NumberingCheckbox } from './NumberingCheckbox';
import { NumberInput } from './numberings/NumberInput';

function isBaseNumbering(v: unknown): v is BaseNumbering {
  return v instanceof BaseNumbering;
}

export type Props = {
  app: App; // a reference to the whole app

  bases: Base[]; // the bases to edit
};

export function NumberingField(props: Props) {
  let baseNumberings = props.bases.map(base => base.numbering).filter(isBaseNumbering);

  if (!props.bases.every(base => base.numbering)) {
    return (
      <div style={{ marginTop: '31px', alignSelf: 'start', display: 'flex' }} >
        <FieldLabel style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
          <NumberingCheckbox {...props} />
          <span style={{ marginLeft: '6px' }} >
            Numbering
          </span>
        </FieldLabel>
        <div style={{ width: '8px' }} /> {/* right side padding for very long number values */}
      </div>
    );
  }

  return (
    <div style={{ marginTop: '31px', alignSelf: 'start', display: 'flex' }} >
      <div style={{ display: 'flex', alignItems: 'center' }} >
        <NumberingCheckbox {...props} />
        <span style={{ width: '10px' }} />
        <FieldLabel style={{ display: 'flex', alignItems: 'center', cursor: 'text' }} >
          <NumberInput {...props} baseNumberings={baseNumberings} />
          <span style={{ marginLeft: '8px' }} >
            Numbering
          </span>
        </FieldLabel>
      </div>
      <div style={{ width: '8px' }} /> {/* right side padding for very long number values */}
    </div>
  );
}
