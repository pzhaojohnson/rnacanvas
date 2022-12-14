import type { App } from 'App';

import type { StrungElement } from 'Draw/bonds/strung/StrungElement';

import * as React from 'react';

import { FillColorPicker } from 'Forms/edit/bonds/strung/FillColorPicker';
import { FillOpacityInput } from 'Forms/edit/bonds/strung/FillOpacityInput';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The strung elements to edit.
   */
  strungElements: StrungElement[];

  /**
   * The index that the strung elements are at in the strung elements
   * arrays of the bonds possessing them.
   */
  strungElementsIndex: number;
};

/**
 * Allows editing of the "fill" and "fill-opacity" attributes of the SVG
 * element of each strung element.
 *
 * Can only set the "fill" attribute to color values.
 */
export function FillColorField(props: Props) {
  return (
    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }} >
      <FillColorPicker {...props} />
      <FieldLabel style={{ marginLeft: '6px', cursor: 'text' }} >
        <FillOpacityInput {...props} style={{ textAlign: 'end' }} />
        <span style={{ marginLeft: '8px' }} >
          Fill Color
        </span>
      </FieldLabel>
    </div>
  );
}
