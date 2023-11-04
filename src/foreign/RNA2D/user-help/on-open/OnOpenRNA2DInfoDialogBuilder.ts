import { DOMNodeFactory } from './helpers/DOMNodeFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { DragTranslaterBuilder } from 'Forms/drag/DragTranslaterBuilder';

import { FormShowerHider2Builder as FormShowerBuilder } from 'Forms/show/FormShowerHider2Builder';

export class OnOpenRNA2DInfoDialogBuilder {
  build() {
    let closeButtonFactory = new CloseButtonFactory();
    let closeButton = closeButtonFactory.produce();

    let domNodeFactory = new DOMNodeFactory({ closeButton });
    let domNode = domNodeFactory.produce();

    (new DragTranslaterBuilder()).buildFor(domNode);

    return (new FormShowerBuilder()).buildUsing({
      targetForm: domNode,
      hideButton: closeButton,
      documentBody: document.body,
    });
  }
}
