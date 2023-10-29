import { RNAcanvasReferencesDialogShower } from './RNAcanvasReferencesDialogShower';

import { RNAcanvasReferencesDialogFactory } from './helpers/RNAcanvasReferencesDialogFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { RNAcanvasReferencesDialogHider } from './helpers/RNAcanvasReferencesDialogHider';

import { DragTranslaterBuilder } from 'Forms/drag/DragTranslaterBuilder';

export class RNAcanvasReferencesDialogShowerBuilder {
  build(): RNAcanvasReferencesDialogShower {
    let closeButtonFactory = new CloseButtonFactory();
    let closeButton = closeButtonFactory.produce();

    let rnaCanvasReferencesDialogFactory = new RNAcanvasReferencesDialogFactory({
      closeButton,
    });

    let rnaCanvasReferencesDialog = rnaCanvasReferencesDialogFactory.produce();

    // allows the dialog to be hidden by the user
    let rnaCanvasReferencesDialogHider = new RNAcanvasReferencesDialogHider({
      rnaCanvasReferencesDialog,
      closeButton,
    });

    (new DragTranslaterBuilder()).buildFor(rnaCanvasReferencesDialog);

    return new RNAcanvasReferencesDialogShower({
      rnaCanvasReferencesDialog,
    });
  }
}
