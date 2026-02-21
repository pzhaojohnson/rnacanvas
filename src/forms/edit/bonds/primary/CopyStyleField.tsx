import type { App } from 'App';

import type { Base } from 'Draw/bases/Base';

import * as React from 'react';

import { CopyStyleInput } from 'Forms/edit/svg/CopyStyleInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';
import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';


export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The bases to edit.
   */
  primaryBonds: PrimaryBond[];
}

// should be stable across mountings and unmountings
// (to facilitate refocusing when the app is refreshed)
const inputId = generateHTMLCompatibleUUID();

export class CopyStyleField extends React.Component<Props> {
  handleBeforeEdit() {
    this.props.app.pushUndo();
  }

  handleEdit() {
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
        <CopyStyleInput
		      app={this.props.app}
          id={inputId}
		      bonds={this.props.primaryBonds}
          onBeforeEdit={() => this.handleBeforeEdit()}
          onEdit={() => this.handleEdit()}
          style={{ minWidth: '49px' }}
        />
        <span style={{ paddingLeft: '8px' }} >
          Copy Style
        </span>
      </FieldLabel>
    );
  }
}
