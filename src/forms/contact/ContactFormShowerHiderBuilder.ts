import { FormShowerHider2Builder } from 'Forms/show/FormShowerHider2Builder';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { ContactFormFactory } from './helpers/ContactFormFactory';

export class ContactFormShowerHiderBuilder {
  build() {
    let closeButton = (new CloseButtonFactory()).produce();

    let contactFormFactory = new ContactFormFactory({ closeButton });
    let positionedContactForm = contactFormFactory.producePositioned();

    return (new FormShowerHider2Builder()).buildUsing({
      targetForm: positionedContactForm,
      hideButton: closeButton,
      documentBody: document.body,
    });
  }
}
