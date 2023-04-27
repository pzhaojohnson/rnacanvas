import type { App } from 'App';

import type { Base } from 'Draw/bases/Base';

import * as React from 'react';

import { NumericAttributeInput } from 'Forms/edit/svg/NumericAttributeInput';
import type { EditEvent } from 'Forms/edit/svg/NumericAttributeInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

type Point = {
  x: number;
  y: number;
};

class BasesWrapper {
  readonly bases: Base[];

  constructor(bases: Base[]) {
    this.bases = bases;
  }

  get textCenters(): Map<Base, Point> {
    let textCenters = new Map<Base, Point>();
    this.bases.forEach(b => {
      let textBBox = b.text.bbox();
      let textCenter = { x: textBBox.cx, y: textBBox.cy };
      textCenters.set(b, textCenter);
    });
    return textCenters;
  }

  set textCenters(textCenters: Map<Base, Point>) {
    this.bases.forEach(b => {
      let textCenter = textCenters.get(b);
      if (textCenter) {
        b.text.center(textCenter.x, textCenter.y);
      }
    });
  }
}

// should be stable across mountings and unmountings
// (to facilitate refocusing when the app is refreshed)
const inputId = generateHTMLCompatibleUUID();

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The bases to edit.
   */
  bases: Base[];
}

export class FontSizeField extends React.Component<Props> {
  // to be cached on before edit
  _textCenters?: Map<Base, Point>;

  get bases() {
    return new BasesWrapper(this.props.bases);
  }

  handleBeforeEdit(event: EditEvent) {
    this._textCenters = this.bases.textCenters; // cache

    this.props.app.pushUndo();
  }

  handleEdit(event: EditEvent) {
    let newValue = event.newValue;

    // recenter bases text elements
    if (this._textCenters) {
      this.bases.textCenters = this._textCenters;
      this._textCenters = undefined; // reset
    }

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
        <NumericAttributeInput
          id={inputId}
          elements={this.props.bases.map(b => b.text)}
          attributeName='font-size'
          minValue={1}
          places={1}
          onBeforeEdit={event => this.handleBeforeEdit(event)}
          onEdit={event => this.handleEdit(event)}
          style={{ minWidth: '39px' }}
        />
        <span style={{ paddingLeft: '8px' }} >
          Font Size
        </span>
      </FieldLabel>
    );
  }
}
