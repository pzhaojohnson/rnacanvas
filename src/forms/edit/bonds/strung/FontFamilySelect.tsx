import type { App } from 'App';

import type { Bond } from 'Forms/edit/bonds/strung/Bond';
import type { StrungText } from 'Draw/bonds/strung/StrungElement';

import { svgElementOfStrungElement } from 'Forms/edit/bonds/strung/svgElementOfStrungElement';

import { repositionStrungElementAtIndex } from 'Forms/edit/bonds/strung/repositionStrungElementAtIndex';

import * as React from 'react';

// the underlying font family select component
import { FontFamilySelect as _FontFamilySelect } from 'Forms/edit/svg/FontFamilySelect';
import { EditEvent } from 'Forms/edit/svg/FontFamilySelect';

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;

  /**
   * The strung elements to edit.
   */
  strungElements: StrungText[];

  /**
   * The bonds possessing the strung elements.
   */
  bonds: Bond[];

  /**
   * The index that each of the strung elements is at in the strung
   * elements array of the bond that possesses it.
   */
  strungElementsIndex: number;
};

/**
 * Allows editing of the "font-family" attribute of the SVG element of
 * each of the strung elements.
 */
export class FontFamilySelect extends React.Component<Props> {
  onBeforeEdit(event: EditEvent) {
    this.props.app.pushUndo();
  }

  onEdit(event: EditEvent) {
    this.props.bonds.forEach(bond => {
      repositionStrungElementAtIndex({
        bond,
        index: this.props.strungElementsIndex,
      });
    });

    this.props.app.refresh();
  }

  render() {
    let strungElements = this.props.strungElements;
    let svgElements = strungElements.map(svgElementOfStrungElement);

    return (
      <div style={{ marginTop: '8px' }} >
        <_FontFamilySelect
          elements={svgElements}
          onBeforeEdit={event => this.onBeforeEdit(event)}
          onEdit={event => this.onEdit(event)}
        />
      </div>
    );
  }
}
