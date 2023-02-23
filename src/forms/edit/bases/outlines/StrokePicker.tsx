import type { App } from 'App';

import type { CircleBaseOutline as BaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import * as React from 'react';

import { ColorAttributePicker } from 'Forms/edit/svg/ColorAttributePicker';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The base outlines to edit.
   */
  outlines: BaseOutline[];
}

export function StrokePicker(props: Props) {
  return (
    <ColorAttributePicker
      elements={props.outlines.map(o => o.circle)}
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
