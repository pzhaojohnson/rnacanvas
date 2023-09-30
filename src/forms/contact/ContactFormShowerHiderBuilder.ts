import { ContactFormShowerHider } from './ContactFormShowerHider';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { ContactFormFactory } from './helpers/ContactFormFactory';

export class ContactFormShowerHiderBuilder {
  build(): ContactFormShowerHider {
    let closeButton = (new CloseButtonFactory()).produce();

    let contactFormFactory = new ContactFormFactory({ closeButton });
    let positionedContactForm = contactFormFactory.producePositioned();

    return new ContactFormShowerHider({
      positionedContactForm,
      closeButton,
    });
  }
}
