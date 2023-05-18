import type { App } from 'App';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as React from 'react';

import styles from './BaseSpacingField.css';

import { NumberPropertyInput } from 'Forms/edit/objects/NumberPropertyInput';
import type { EditEvent } from 'Forms/edit/objects/NumberPropertyInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

/**
 * Meant to help make getting and setting the base-pair bond length of
 * the drawing easier.
 */
class DrawingWrapper {
  readonly drawing: StrictDrawing;

  constructor(drawing: StrictDrawing) {
    this.drawing = drawing;
  }

  get basePairBondLength(): number {
    return this.drawing.generalLayoutProps.basePairBondLength;
  }

  set basePairBondLength(basePairBondLength: number) {
    // update the base-pair bond length
    this.drawing.generalLayoutProps.basePairBondLength = basePairBondLength;
    this.drawing.updateLayout();
  }
}

// should be stable across mountings and unmountings
// (to facilitate refocusing when the app is refreshed)
const inputId = generateHTMLCompatibleUUID();

function Asterisk() {
  return (
    <span className={styles.asterisk} >
      *
    </span>
  );
}

function AppliesToAllSecondaryBondsNote() {
  return (
    <p className={styles.appliesToAllSecondaryBondsNote} >
      <Asterisk />
      &nbsp;Applies to all secondary bonds.
    </p>
  );
}

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;
};

export class BaseSpacingField extends React.Component<Props> {
  get drawing() {
    return new DrawingWrapper(this.props.app.drawing);
  }

  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    let newValue = event.newValue;

    // update the drawing
    this.drawing.basePairBondLength = newValue;

    this.props.app.refresh(); // refresh after updating everything else
  }

  render() {
    // the drawing itself should be updated on edit
    let objects = [{ basePairBondLength: this.drawing.basePairBondLength }];

    return (
      <div className={styles.baseSpacingField} >
        <FieldLabel style={{ cursor: 'text' }} >
          <NumberPropertyInput
            id={inputId}
            objects={objects}
            propertyName='basePairBondLength'
            minValue={0}
            places={2}
            onBeforeEdit={event => this.handleBeforeEdit(event)}
            onEdit={event => this.handleEdit(event)}
            style={{ minWidth: '42px' }}
          />
          <span style={{ paddingLeft: '8px' }} >
            Base Spacing&nbsp;
          </span>
          <Asterisk />
        </FieldLabel>
        <AppliesToAllSecondaryBondsNote />
      </div>
    );
  }
}
