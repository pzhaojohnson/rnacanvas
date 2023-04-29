import type { App } from 'App';

import type { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import * as React from 'react';

import { ColorAttributePicker } from 'Forms/edit/svg/ColorAttributePicker';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The tertiary bonds to edit.
   */
  tertiaryBonds: TertiaryBond[];
}

export function StrokePicker(props: Props) {
  return (
    <ColorAttributePicker
      elements={props.tertiaryBonds.map(tb => tb.path)}
      attributeName='stroke'
      onBeforeEdit={() => {
        props.app.pushUndo();
      }}
      onEdit={event => {
        props.app.refresh(); // refresh after updating all values
      }}
    />
  );
}
