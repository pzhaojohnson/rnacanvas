export interface CiteButton {
  addEventListener: (name: 'click', listener: () => void) => void;
}

export interface CiteFormShower {
  /**
   * Shows the cite form.
   *
   * To be called on cite button clicks.
   */
  show(): void;
}

export type Config = {
  citeButton: CiteButton;

  citeFormShower: CiteFormShower;
};

export class CiteButtonClickHandler {
  constructor(config: Config) {
    config.citeButton.addEventListener('click', () => {
      config.citeFormShower.show();
    });
  }
}
