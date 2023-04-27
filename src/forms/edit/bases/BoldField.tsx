import * as React from 'react';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';
import type { App } from 'App';
import type { Base } from 'Draw/bases/Base';
import { interpretNumber } from 'Draw/svg/interpretNumber';

function isBlankString(v: unknown): boolean {
  return typeof v == 'string' && v.trim().length == 0;
}

function isBold(b: Base): boolean {
  let fw = b.text.attr('font-weight');
  if (fw == undefined || isBlankString(fw)) {
    return false;
  } else if (fw == 'bold') {
    return true;
  } else {
    let n = interpretNumber(fw);
    if (n) {
      return n.valueOf() >= 550;
    } else {
      return false;
    }
  }
}

function areAllBold(bs: Base[]): boolean {
  return bs.filter(b => !isBold(b)).length == 0;
}

export type Props = {
  app: App;

  // the bases to edit
  bases: Base[];
}

export function BoldField(props: Props) {
  return (
    <CheckboxField
      label='Bold'
      checked={areAllBold(props.bases)}
      onChange={event => {
        props.app.pushUndo();
        let fw = event.target.checked ? 700 : 400;
        props.bases.forEach(b => {

          // remember center coordinates
          let bbox = b.text.bbox();
          let center = { x: bbox.cx, y: bbox.cy };

          b.text.attr({ 'font-weight': fw });

          // recenter
          b.text.center(center.x, center.y);
        });
        props.app.refresh();
      }}
      style={{ marginTop: '8px', alignSelf: 'start' }}
    />
  );
}
