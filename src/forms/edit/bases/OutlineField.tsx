import * as React from 'react';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';
import type { App } from 'App';
import type { Base } from 'Draw/bases/Base';
import { addCircleOutline, removeCircleOutline } from 'Draw/bases/outlines/circle/add';
import { setValues as setOutlineValues } from 'Draw/bases/outlines/circle/values';

export type Props = {
  app: App;

  // the bases to edit
  bases: Base[];
}

export function allHaveOutlines(bases: Base[]): boolean {
  return bases.filter(b => !b.outline).length == 0;
}

let recommendedDefaults = {
  circle: {
    'r': 7,
    'stroke': '#00ffff',
    'stroke-width': 1,
    'stroke-opacity': 1,
    'fill': '#c3ffff',
    'fill-opacity': 1,
  },
};

function addOutlines(bases: Base[]) {
  bases.forEach(b => {
    let hadOutline = b.outline ? true : false;

    // don't overwrite preexisting outlines
    if (!b.outline) {
      addCircleOutline(b);
    }

    // check that outline was added successfully
    // and don't overwrite the values of preexisting outlines
    if (b.outline && !hadOutline) {
      setOutlineValues(b.outline, recommendedDefaults);
      b.outline.sendToBack();
    }
  });
}

function removeOutlines(bases: Base[]) {
  bases.forEach(b => removeCircleOutline(b));
}

export function OutlineField(props: Props) {
  return (
    <CheckboxField
      label='Outline'
      checked={allHaveOutlines(props.bases)}
      onChange={event => {
        props.app.pushUndo();
        if (event.target.checked) {
          addOutlines(props.bases);
        } else {
          removeOutlines(props.bases);
        }
        props.app.refresh();
      }}
      style={{ marginTop: '24px', alignSelf: 'start' }}
    />
  );
}
