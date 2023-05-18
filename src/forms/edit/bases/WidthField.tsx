import type { App } from 'App';

import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as React from 'react';

import { NumberPropertyInput } from 'Forms/edit/objects/NumberPropertyInput';
import type { EditEvent } from 'Forms/edit/objects/NumberPropertyInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

/**
 * Meant to help make getting and setting the width of bases in the
 * drawing easier.
 */
class DrawingWrapper {
  readonly drawing: StrictDrawing;

  constructor(drawing: StrictDrawing) {
    this.drawing = drawing;
  }

  get baseWidth(): number {
    return this.drawing.baseWidth;
  }

  set baseWidth(baseWidth: number) {
    this.drawing.baseWidth = baseWidth;
    this.drawing.updateLayout();
  }
}

// keep stable to help refocus the input element on app refresh
const inputId = generateHTMLCompatibleUUID();

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;
}

export class WidthField extends React.Component<Props> {
  get drawing() {
    return new DrawingWrapper(this.props.app.drawing);
  }

  handleBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    let newValue = event.newValue;

    // update the drawing
    this.drawing.baseWidth = newValue;

    this.props.app.refresh(); // refresh after updating everything else
  }

  render() {
    // should update the drawing itself on edit
    let objects = [{ baseWidth: this.drawing.baseWidth }];

    let style: React.CSSProperties = {
      alignSelf: 'start',
      cursor: 'text',
    };

    return (
      <FieldLabel style={style} >
        <NumberPropertyInput
          id={inputId}
          objects={objects}
          propertyName='baseWidth'
          minValue={0.01}
          places={2}
          onBeforeEdit={event => this.handleBeforeEdit(event)}
          onEdit={event => this.handleEdit(event)}
          style={{ minWidth: '52px' }}
        />
        <span style={{ paddingLeft: '8px' }} >
          Width
        </span>
      </FieldLabel>
    );
  }
}
