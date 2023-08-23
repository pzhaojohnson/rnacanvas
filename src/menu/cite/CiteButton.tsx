import * as React from 'react';

import styles from './CiteButton.css';

import { RNAcanvasReferencesDialogShowerBuilder } from 'Cite/RNAcanvas-references-dialog/RNAcanvasReferencesDialogShowerBuilder';

let rnaCanvasReferencesDialogShowerBuilder = new RNAcanvasReferencesDialogShowerBuilder();
let rnaCanvasReferencesDialogShower = rnaCanvasReferencesDialogShowerBuilder.build();

/**
 * Opens a dialog viewable by the user with references to the
 * RNAcanvas publication and related publications.
 */
export function CiteButton() {
  let className = styles.citeButton;

  let onClick = () => rnaCanvasReferencesDialogShower.show();

  return (
    <button {...{ className, onClick }} >
      "Cite"
    </button>
  );
}
