import type { App } from 'App';

import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import * as React from 'react';

import { ColorAttributePicker } from 'Forms/edit/svg/ColorAttributePicker';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The base numberings to edit.
   */
  baseNumberings: BaseNumbering[];
}

export function ColorPicker(props: Props) {
  // this component assumes that text fill is the same as line stroke
  let elements = props.baseNumberings.map(bn => bn.text);

  return (
    <ColorAttributePicker
      elements={elements}
      attributeName='fill'
      onBeforeEdit={() => {
        props.app.pushUndo();
      }}
      onEdit={event => {
        let newValue = event.newValue;
        let newValueHexCode = newValue.toHex();

        // update line strokes
        props.baseNumberings.forEach(bn => {
          bn.line.attr('stroke', newValueHexCode);
        });

        props.app.refresh(); // refresh after updating all values
      }}
    />
  );
}
