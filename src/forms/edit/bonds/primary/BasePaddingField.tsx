import type { App } from 'App';

import type { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

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
   * The primary bonds to edit.
   */
  primaryBonds: PrimaryBond[];
}

export class BasePaddingField extends React.Component<Props> {
  get objects() {
    return this.props.primaryBonds.flatMap(pb => [
      { basePadding: pb.basePadding1 },
      { basePadding: pb.basePadding2 },
    ]);
  }

  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    let newValue = event.newValue;

    // update the actual base padding properties of the primary bonds
    this.props.primaryBonds.forEach(pb => {
      pb.basePadding1 = newValue;
      pb.basePadding2 = newValue;
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
      <FieldLabel style={style} >
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
