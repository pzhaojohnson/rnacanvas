export type Config = {
  /**
   * The contact button to show.
   *
   * Is expected to already have CSS styles to position it on screen
   * and at the desired Z index when appended to the document body.
   */
  positionedContactButton: HTMLElement;
};

export class ContactButtonShower {
  _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  /**
   * Simply appends the contact button to the document body.
   */
  show() {
    document.body.appendChild(this._config.positionedContactButton);
  }
}
