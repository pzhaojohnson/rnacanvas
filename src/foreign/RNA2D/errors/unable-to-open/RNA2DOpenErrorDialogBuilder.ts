import { RNA2DOpenErrorDialog } from './RNA2DOpenErrorDialog';

import { DOMNodeFactory } from './helpers/DOMNodeFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

export class RNA2DOpenErrorDialogBuilder {
  build() {
    let domNodeFactory = new DOMNodeFactory();

    let closeButtonFactory = new CloseButtonFactory();
    let closeButton = closeButtonFactory.produce();

    domNodeFactory.useThisCloseButton(closeButton);

    let domNode = domNodeFactory.produce();

    return new RNA2DOpenErrorDialog({
      domNode,
      closeButton,
    });
  }
}
