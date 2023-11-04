import { FormShowerHider2Builder } from 'Forms/show/FormShowerHider2Builder';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { ContactFormFactory } from './helpers/ContactFormFactory';

import { DragTranslaterBuilder } from 'Forms/drag/DragTranslaterBuilder';

import { FormUntranslaterBuilder } from 'Forms/drag/FormUntranslaterBuilder';

export class ContactFormShowerHiderBuilder {
  build() {
    let closeButton = (new CloseButtonFactory()).produce();

    let contactFormFactory = new ContactFormFactory({ closeButton });
    let positionedContactForm = contactFormFactory.producePositioned();

    (new DragTranslaterBuilder()).buildFor(positionedContactForm);

    (new FormUntranslaterBuilder()).buildUsing({
      targetForm: positionedContactForm,
      untranslateButton: closeButton,
    });

    return (new FormShowerHider2Builder()).buildUsing({
      targetForm: positionedContactForm,
      hideButton: closeButton,
      documentBody: document.body,
    });
  }
}
