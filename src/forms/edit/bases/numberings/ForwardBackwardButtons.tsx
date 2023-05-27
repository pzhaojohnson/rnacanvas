import type { App } from 'App';

import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';
import { bringToFront } from 'Draw/bases/numberings/z';
import { sendToBack } from 'Draw/bases/numberings/z';

import * as React from 'react';
import { ForwardBackwardButtons as _ForwardBackwardButtons } from 'Forms/buttons/ForwardBackwardButtons';

export type Props = {
  app: App; // a reference to the whole app

  baseNumberings: BaseNumbering[]; // the base numberings to edit
};

export function ForwardBackwardButtons(props: Props) {
  return (
    <_ForwardBackwardButtons
      bringToFront={() => {
        props.app.pushUndo();
        props.baseNumberings.forEach(bn => bringToFront(bn));
        props.app.refresh();
      }}
      sendToBack={() => {
        props.app.pushUndo();
        props.baseNumberings.forEach(bn => sendToBack(bn));
        props.app.refresh();
      }}
      style={{ margin: '13px 0 0 2px' }}
    />
  );
}
