import type { App } from 'App';

import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

import { strokeDasharrayValueEqualsNone as equalsNone } from 'Values/svg/strokeDasharrayValueEqualsNone';

import * as React from 'react';

// the underlying component
import { StrokeDasharrayField as _StrokeDasharrayField } from 'Forms/edit/svg/StrokeDasharrayField';
import { EditEvent } from 'Forms/edit/svg/StrokeDasharrayField';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

import { isNullish } from 'Values/isNullish';

/**
 * A value that the stroke-dasharray attribute of an SVG element can
 * have that is a string.
 */
type StringStrokeDasharrayValue = string;

// should be stable across mountings and unmountings
// (to facilitate refocusing when the app is refreshed)
const inputId = generateHTMLCompatibleUUID();

/**
 * To be remembered between mountings and unmountings.
 */
let lastNewDashedValue: StringStrokeDasharrayValue = '3 1';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The primary bonds to edit.
   */
  primaryBonds: PrimaryBond[];
};

export class StrokeDasharrayField extends React.Component<Props> {
  get defaultDashedValue(): StringStrokeDasharrayValue {
    let defaultValue = (
      PrimaryBond.recommendedDefaults.line['stroke-dasharray']
    );

    return !isNullish(defaultValue) && !equalsNone(defaultValue) ? (
      defaultValue
    ) : (
      lastNewDashedValue
    );
  }

  handleBeforeEdit() {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    if (!equalsNone(event.newValue)) {
      lastNewDashedValue = event.newValue;
    }

    this.props.app.refresh(); // refresh after updating all values
  }

  render() {
    return (
      <_StrokeDasharrayField
        label='Dashed'
        elements={this.props.primaryBonds.map(pb => pb.line)}
        defaultDashedValue={this.defaultDashedValue}
        onBeforeEdit={() => this.handleBeforeEdit()}
        onEdit={event => this.handleEdit(event)}
        input={{ id: inputId }}
        style={{
          marginTop: '8px',
          minHeight: '20px',
          alignSelf: 'start',
        }}
      />
    );
  }
}
