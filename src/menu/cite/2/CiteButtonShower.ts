export type Config = {
  /**
   * The cite button to show.
   *
   * Is expected to already have CSS styles to position it on screen
   * and at the desired Z index when appended to the document body.
   */
  positionedCiteButton: HTMLElement;
};

export class CiteButtonShower {
  _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  /**
   * Simply appends the cite button to the document body.
   */
  show() {
    document.body.appendChild(this._config.positionedCiteButton);
  }
}
