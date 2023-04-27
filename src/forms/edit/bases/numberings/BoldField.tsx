import * as React from 'react';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';
import type { App } from 'App';
import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

export type Props = {
  app: App;

  // the base numberings to edit
  baseNumberings: BaseNumbering[];
}

function isBold(bn: BaseNumbering): boolean {
  let fw = bn.text.attr('font-weight');
  if (typeof fw == 'string') {
    return fw == 'bold';
  } else if (typeof fw == 'number') {
    return fw >= 700;
  } else {
    return false;
  }
}

function areAllBold(baseNumberings: BaseNumbering[]): boolean {
  return baseNumberings.filter(bn => !isBold(bn)).length == 0;
}

export function BoldField(props: Props) {
  return (
    <CheckboxField
      label='Bold'
      checked={areAllBold(props.baseNumberings)}
      onChange={event => {
        props.app.pushUndo();
        let fw = event.target.checked ? 700 : 400;
        props.baseNumberings.forEach(bn => {
          bn.text.attr({ 'font-weight': fw });
          bn.reposition();
        });
        props.app.refresh();
      }}
      style={{ marginTop: '8px', minHeight: '20px', alignSelf: 'start' }}
    />
  );
}
