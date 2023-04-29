import type { App } from 'App';

import type { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

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
   * The secondary bonds to edit.
   */
  secondaryBonds: SecondaryBond[];
}

export class BasePaddingField extends React.Component<Props> {
  get objects() {
    return this.props.secondaryBonds.flatMap(sb => [
      { basePadding: sb.basePadding1 },
      { basePadding: sb.basePadding2 },
    ]);
  }

  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    let newValue = event.newValue;

    // update the actual base padding properties of the secondary bonds
    this.props.secondaryBonds.forEach(sb => {
      sb.basePadding1 = newValue;
      sb.basePadding2 = newValue;
    });

    this.props.app.refresh();
  }

  render() {
    let style: React.CSSProperties = {
      marginTop: '8px',
      alignSelf: 'start',
      cursor: 'text',
    };

    return (
      <FieldLabel {...{ style }} >
        <NumberPropertyInput
          id={inputId}
          objects={this.objects}
          propertyName='basePadding'
          minValue={0}
          places={2}
          onBeforeEdit={event => this.handleBeforeEdit(event)}
          onEdit={event => this.handleEdit(event)}
          style={{ minWidth: '39px' }}
        />
        <span style={{ paddingLeft: '8px' }} >
          Base Padding
        </span>
      </FieldLabel>
    );
  }
}
