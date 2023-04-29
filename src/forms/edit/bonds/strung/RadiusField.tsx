import type { App } from 'App';

import type { StrungCircle } from 'Draw/bonds/strung/StrungElement';

import { svgElementOfStrungElement } from 'Forms/edit/bonds/strung/svgElementOfStrungElement';

import * as React from 'react';

import { NumericAttributeInput } from 'Forms/edit/svg/NumericAttributeInput';
import { EditEvent } from 'Forms/edit/svg/NumericAttributeInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

const baseInputId = generateHTMLCompatibleUUID();

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The strung elements to edit.
   */
  strungElements: StrungCircle[];

  /**
   * The index that the strung elements are at in the strung elements
   * arrays of the bonds possessing them.
   */
  strungElementsIndex: number;
};

/**
 * Allows editing of the "r" attribute of strung SVG circle elements.
 */
export class RadiusField extends React.Component<Props> {
  get inputId(): string {
    // make different for each strung elements index
    return baseInputId + this.props.strungElementsIndex;
  }

  onBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  onEdit(event: EditEvent) {
    this.props.app.refresh();
  }

  render() {
    let strungElements = this.props.strungElements;
    let svgElements = strungElements.map(svgElementOfStrungElement);

    let style = { marginTop: '8px', alignSelf: 'start', cursor: 'text' };

    return (
      <FieldLabel style={style} >
        <NumericAttributeInput
          id={this.inputId}
          elements={svgElements}
          attributeName='r'
          minValue={0}
          places={2}
          onBeforeEdit={event => this.onBeforeEdit(event)}
          onEdit={event => this.onEdit(event)}
        />
        <span style={{ marginLeft: '8px' }} >
          Radius
        </span>
      </FieldLabel>
    );
  }
}
