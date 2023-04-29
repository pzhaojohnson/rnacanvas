import type { App } from 'App';

import type { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

import * as SVG from '@svgdotjs/svg.js';

import * as React from 'react';

import { ColorAttributePicker } from 'Forms/edit/svg/ColorAttributePicker';

import { colorValuesAreEqual } from 'Draw/svg/colorValuesAreEqual';

/**
 * Returns true if the color is white.
 */
function isWhite(color: SVG.Color): boolean {
  return colorValuesAreEqual(color.toHex(), '#ffffff');
}

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The secondary bonds to edit.
   */
  secondaryBonds: SecondaryBond[];
}

export function StrokePicker(props: Props) {
  return (
    <ColorAttributePicker
      elements={props.secondaryBonds.map(sb => sb.line)}
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
