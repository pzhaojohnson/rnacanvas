import { ContactFormShowerHider } from './ContactFormShowerHider';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { ContactFormFactory } from './helpers/ContactFormFactory';

import { DragTranslaterBuilder } from 'Forms/drag/DragTranslaterBuilder';

import { FormUntranslaterBuilder } from 'Forms/drag/FormUntranslaterBuilder';

export class ContactFormShowerHiderBuilder {
  build(): ContactFormShowerHider {
    let closeButton = (new CloseButtonFactory()).produce();

    let contactFormFactory = new ContactFormFactory({ closeButton });
    let positionedContactForm = contactFormFactory.producePositioned();

    (new DragTranslaterBuilder()).buildFor(positionedContactForm);

    (new FormUntranslaterBuilder()).buildUsing({
      targetForm: positionedContactForm,
      untranslateButton: closeButton,
    });

    return new ContactFormShowerHider({
      positionedContactForm,
      closeButton,
    });
  }
}
