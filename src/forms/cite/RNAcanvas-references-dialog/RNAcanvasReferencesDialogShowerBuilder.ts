import { FormShowerHider2Builder as FormShowerBuilder } from 'Forms/show/FormShowerHider2Builder';

import { RNAcanvasReferencesDialogFactory } from './helpers/RNAcanvasReferencesDialogFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

export class RNAcanvasReferencesDialogShowerBuilder {
  build() {
    return rnaCanvasReferencesDialogShower;
  }
}

const closeButtonFactory = new CloseButtonFactory();

const closeButton = closeButtonFactory.produce();

const rnaCanvasReferencesDialogFactory = new RNAcanvasReferencesDialogFactory({
  closeButton,
});

const rnaCanvasReferencesDialog = rnaCanvasReferencesDialogFactory.produce();

// only one shower / form copy per app instance
const rnaCanvasReferencesDialogShower = (new FormShowerBuilder()).buildUsing({
  targetForm: rnaCanvasReferencesDialog,
  hideButton: closeButton,
  documentBody: document.body,
});
