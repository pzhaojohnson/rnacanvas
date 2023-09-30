import { ContactButtonShower } from './ContactButtonShower';

import { ContactButtonFactory } from './helpers/ContactButtonFactory';

import { ContactButtonClickHandler } from './helpers/ContactButtonClickHandler';

import { ContactFormShowerHiderBuilder } from 'Forms/contact/ContactFormShowerHiderBuilder';

export class ContactButtonShowerBuilder {
  build(): ContactButtonShower {
    let positionedContactButton = (new ContactButtonFactory()).producePositioned();

    let contactFormShower = (new ContactFormShowerHiderBuilder()).build();

    let contactButtonClickHandler = new ContactButtonClickHandler({
      contactButton: positionedContactButton,
      contactFormShower,
    });

    return new ContactButtonShower({
      positionedContactButton,
    });
  }
}
