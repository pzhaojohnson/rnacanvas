import * as React from 'react';
import { FontFamilySelect } from 'Forms/inputs/font/FontFamilySelect';
import type { App } from 'App';
import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

export type Props = {
  app: App;

  // the base numberings to edit
  baseNumberings: BaseNumbering[];
}

// returns undefined for an empty base numberings array
// or if not all base numberings have the same font family
function currFontFamily(baseNumberings: BaseNumbering[]): string | undefined {
  let ffs = new Set<string>();
  baseNumberings.forEach(bn => {
    let ff = bn.text.attr('font-family');
    if (typeof ff == 'string') {
      ffs.add(ff);
    }
  });
  if (ffs.size == 1) {
    return ffs.values().next().value;
  }
}

export function FontFamilyField(props: Props) {
  return (
    <div style={{ marginTop: '8px', width: '100%', display: 'flex', flexDirection: 'column' }} >
      <FontFamilySelect
        value={currFontFamily(props.baseNumberings)}
        onChange={event => {
          if (event.target.value != currFontFamily(props.baseNumberings)) {
            props.app.pushUndo();
            props.baseNumberings.forEach(bn => {
              bn.text.attr({ 'font-family': event.target.value });
              bn.reposition();
            });
            props.app.refresh();
          }
        }}
      />
    </div>
  );
}
