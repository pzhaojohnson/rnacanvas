import type { App } from 'App';

import type { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import * as React from 'react';

import { OpacityAttributeInput } from 'Forms/edit/svg/OpacityAttributeInput';
import type { EditEvent } from 'Forms/edit/svg/OpacityAttributeInput';
import type { CSSProperties } from 'Forms/edit/svg/OpacityAttributeInput';

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
   * The tertiary bonds to edit.
   */
  tertiaryBonds: TertiaryBond[];
}

export class StrokeOpacityInput extends React.Component<Props> {
  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    this.props.app.refresh(); // refresh after updating all values
  }

  render() {
    let style: CSSProperties = {
      marginRight: '8px',
      minWidth: '32px',
      textAlign: 'end',
    };

    return (
      <OpacityAttributeInput
        id={id}
        elements={this.props.tertiaryBonds.map(tb => tb.path)}
        attributeName='stroke-opacity'
        places={2}
        onBeforeEdit={event => this.handleBeforeEdit(event)}
        onEdit={event => this.handleEdit(event)}
        style={style}
      />
    );
  }
}
