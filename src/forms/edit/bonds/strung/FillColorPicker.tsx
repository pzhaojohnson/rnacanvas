import type { App } from 'App';

import type { StrungElement } from 'Draw/bonds/strung/StrungElement';

import { svgElementOfStrungElement } from 'Forms/edit/bonds/strung/svgElementOfStrungElement';

import * as React from 'react';

import { ColorAttributePicker } from 'Forms/edit/svg/ColorAttributePicker';
import { EditEvent } from 'Forms/edit/svg/ColorAttributePicker';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The strung elements to edit.
   */
  strungElements: StrungElement[];
};

/**
 * Allows editing of the "fill" attribute of the SVG element of each
 * strung element.
 *
 * Can only set the "fill" attribute to a color value.
 */
export class FillColorPicker extends React.Component<Props> {
  onBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  onEdit(event: EditEvent) {
    this.props.app.refresh();
  }

  render() {
    let strungElements = this.props.strungElements;
    let svgElements = strungElements.map(svgElementOfStrungElement);

    return (
      <ColorAttributePicker
        elements={svgElements}
        attributeName='fill'
        onBeforeEdit={event => this.onBeforeEdit(event)}
        onEdit={event => this.onEdit(event)}
      />
    );
  }
}
