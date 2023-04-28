import type { App } from 'App';

import type { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

import * as React from 'react';

import { OpacityAttributeInput } from 'Forms/edit/svg/OpacityAttributeInput';
import type { EditEvent } from 'Forms/edit/svg/OpacityAttributeInput';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

// should be stable across mountings and unmountings
// (to facilitate refocusing when the app is refreshed)
const id = generateHTMLCompatibleUUID();

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

export class StrokeOpacityInput extends React.Component<Props> {
  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    this.props.app.refresh();
  }

  render() {
    return (
      <OpacityAttributeInput
        id={id}
        elements={this.props.primaryBonds.map(pb => pb.line)}
        attributeName='stroke-opacity'
        places={2}
        onBeforeEdit={event => this.handleBeforeEdit(event)}
        onEdit={event => this.handleEdit(event)}
        style={{ marginRight: '8px', textAlign: 'end' }}
      />
    );
  }
}
