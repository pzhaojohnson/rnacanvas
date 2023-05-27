import type { App } from 'App';

import type { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import * as React from 'react';

import { NumberPropertyInput } from 'Forms/edit/objects/NumberPropertyInput';
import type { EditEvent } from 'Forms/edit/objects/NumberPropertyInput';

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
   * The tertiary bonds to edit.
   */
  tertiaryBonds: TertiaryBond[];
}

export class BasePadding1Field extends React.Component<Props> {
  get objects() {
    return this.props.tertiaryBonds.map(tb => (
      { basePadding1: tb.basePadding1 }
    ));
  }

  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    let newValue = event.newValue;

    // update the actual tertiary bonds property
    this.props.tertiaryBonds.forEach(tb => {
      tb.basePadding1 = newValue;
    });

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
        <NumberPropertyInput
          id={inputId}
          objects={this.objects}
          propertyName='basePadding1'
          minValue={0}
          places={2}
          onBeforeEdit={event => this.handleBeforeEdit(event)}
          onEdit={event => this.handleEdit(event)}
          style={{ minWidth: '49px' }}
        />
        <span style={{ paddingLeft: '8px' }} >
          Base Padding 1
        </span>
      </FieldLabel>
    );
  }
}
