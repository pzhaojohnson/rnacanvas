import type { App } from 'App';

import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import * as React from 'react';

import { NumericAttributeInput } from 'Forms/edit/svg/NumericAttributeInput';
import type { EditEvent } from 'Forms/edit/svg/NumericAttributeInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

// should be stable across mountings and unmountings
// (to facilitate refocusing when the app is refreshed)
const inputId = generateHTMLCompatibleUUID();

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

export class FontSizeField extends React.Component<Props> {
  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    let newValue = event.newValue;

    // reposition the base numberings
    this.props.baseNumberings.forEach(bn => bn.reposition());

    this.props.app.refresh(); // refresh after updating all values
  }

  render() {
    let style: React.CSSProperties = {
      marginTop: '8px',
      alignSelf: 'start',
      cursor: 'text',
    };

    return (
      <FieldLabel style={style} >
        <NumericAttributeInput
          id={inputId}
          elements={this.props.baseNumberings.map(bn => bn.text)}
          attributeName='font-size'
          minValue={1}
          places={1}
          onBeforeEdit={event => this.handleBeforeEdit(event)}
          onEdit={event => this.handleEdit(event)}
          style={{ minWidth: '39px' }}
        />
        <span style={{ paddingLeft: '8px' }} >
          Font Size
        </span>
      </FieldLabel>
    );
  }
}
