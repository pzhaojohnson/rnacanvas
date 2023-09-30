export interface ContactButton {
  addEventListener: (name: 'click', listener: () => void) => void;
}

export interface ContactFormShower {
  /**
   * Shows the contact form.
   *
   * To be called on contact button clicks.
   */
  show(): void;
}

export type Config = {
  contactButton: ContactButton;

  contactFormShower: ContactFormShower;
};

export class ContactButtonClickHandler {
  constructor(config: Config) {
    config.contactButton.addEventListener('click', () => {
      config.contactFormShower.show();
    });
  }
}
