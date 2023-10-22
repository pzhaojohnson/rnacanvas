export interface HideSignaller {
  /**
   * The listener will be called when hide signals are given.
   */
  addListener(listener: () => void): void;
}

export type Config = {
  /**
   * The document body to append the form to.
   */
  documentBody: InstanceType<typeof Document>['body'];

  /**
   * Has fixed positioning CSS styles.
   */
  aFormWithFixedPositioning: HTMLElement;

  hideSignaller: HideSignaller;
};

export class FormShowerHider {
  constructor(private config: Config) {
    config.hideSignaller.addListener(() => this.hide());
  }

  /**
   * Simply appends the form to the document body.
   */
  show() {
    this.config.documentBody.appendChild(this.config.aFormWithFixedPositioning);
  }

  /**
   * Simply removes the form from the document body.
   */
  private hide() {
    this.config.aFormWithFixedPositioning.remove();
  }
}
