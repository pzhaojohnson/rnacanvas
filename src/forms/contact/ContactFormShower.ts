export interface CloseButton {
  addEventListener: (name: 'click', listener: () => void) => void;
}

export type Config = {
  /**
   * The contact form DOM node.
   *
   * Is expected to already have CSS styles to position it on screen
   * and at the desired Z index.
   */
  positionedContactForm: HTMLElement;

  /**
   * The contact form will be hidden (i.e., removed from the document)
   * when this button is clicked.
   */
  closeButton: CloseButton;
};

export class ContactFormShower {
  _config: Config;

  constructor(config: Config) {
    this._config = config;

    config.closeButton.addEventListener('click', () => {
      this._hide();
    });
  }

  /**
   * Simply appends the contact form to the document body.
   */
  show() {
    document.body.appendChild(this._config.positionedContactForm);
  }

  _hide() {
    this._config.positionedContactForm.remove();
  }
}
