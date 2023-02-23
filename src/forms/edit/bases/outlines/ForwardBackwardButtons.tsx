import type { App } from 'App';

import type { CircleBaseOutline as BaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import * as React from 'react';

import { ForwardBackwardButtons as _ForwardBackwardButtons } from 'Forms/buttons/ForwardBackwardButtons';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The base outlines to edit.
   */
  outlines: BaseOutline[];
};

export function ForwardBackwardButtons(props: Props) {
  return (
    <_ForwardBackwardButtons
      bringToFront={() => {
        props.app.pushUndo();
        props.outlines.forEach(o => o.circle.front());
        props.app.refresh();
      }}
      sendToBack={() => {
        props.app.pushUndo();
        props.outlines.forEach(o => o.circle.back());
        props.app.refresh();
      }}
      style={{ margin: '9px 0px 0px 1px' }}
    />
  );
}
