import type { App } from 'App';

import { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

import { strokeDasharrayValueEqualsNone as equalsNone } from 'Values/svg/strokeDasharrayValueEqualsNone';

import * as React from 'react';

// the underlying component
import { StrokeDasharrayField as _StrokeDasharrayField } from 'Forms/edit/svg/StrokeDasharrayField';
import { EditEvent } from 'Forms/edit/svg/StrokeDasharrayField';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

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
let lastNewDashedValue: StringStrokeDasharrayValue = '8 2';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The tertiary bonds to edit.
   */
  tertiaryBonds: TertiaryBond[];
};

export class StrokeDasharrayField extends React.Component<Props> {
  get defaultDashedValue(): StringStrokeDasharrayValue | undefined {
    let recommendedDefaultValue = (
      TertiaryBond.recommendedDefaults.path['stroke-dasharray']
    );

    return !equalsNone(recommendedDefaultValue) ? (
      recommendedDefaultValue
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

    // refresh after updating all values
    this.props.app.refresh();
  }

  render() {
    return (
      <_StrokeDasharrayField
        label='Dashed'
        elements={this.props.tertiaryBonds.map(tb => tb.path)}
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
