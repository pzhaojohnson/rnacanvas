import { FormShowerHider2Builder as FormShowerBuilder } from 'Forms/show/FormShowerHider2Builder';

import { RNAcanvasReferencesDialogFactory } from './helpers/RNAcanvasReferencesDialogFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

export class RNAcanvasReferencesDialogShowerBuilder {
  build() {
    let closeButtonFactory = new CloseButtonFactory();
    let closeButton = closeButtonFactory.produce();

    let rnaCanvasReferencesDialogFactory = new RNAcanvasReferencesDialogFactory({
      closeButton,
    });

    let rnaCanvasReferencesDialog = rnaCanvasReferencesDialogFactory.produce();

    return (new FormShowerBuilder()).buildUsing({
      targetForm: rnaCanvasReferencesDialog,
      hideButton: closeButton,
      documentBody: document.body,
    });
  }
}
