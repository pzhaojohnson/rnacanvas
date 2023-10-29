import { OnOpenRNA2DInfoDialog } from './OnOpenRNA2DInfoDialog';

import { DOMNodeFactory } from './helpers/DOMNodeFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { DragTranslaterBuilder } from 'Forms/drag/DragTranslaterBuilder';

export class OnOpenRNA2DInfoDialogBuilder {
  build(): OnOpenRNA2DInfoDialog {
    let closeButtonFactory = new CloseButtonFactory();
    let closeButton = closeButtonFactory.produce();

    let domNodeFactory = new DOMNodeFactory({ closeButton });
    let domNode = domNodeFactory.produce();

    (new DragTranslaterBuilder()).buildFor(domNode);

    return new OnOpenRNA2DInfoDialog({ domNode, closeButton });
  }
}
