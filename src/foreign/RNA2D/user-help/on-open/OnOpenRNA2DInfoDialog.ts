export interface CloseButton {
  /**
   * To be used to listen for clicks on the close button.
   *
   * Not expected to return anything.
   */
  addEventListener(name: 'click', listener: () => void): void | unknown;
}

export type ConstructorArgs = {
  /**
   * The actual DOM node of the on-open RNA 2D info dialog.
   *
   * Is expected to already have CSS styles to position the DOM
   * node on screen when added to the document body.
   */
  domNode: HTMLElement;

  /**
   * The close button for the on-open RNA 2D info dialog.
   *
   * A click event listener will be added to this close button.
   */
  closeButton: CloseButton;
};

/**
 * A dialog meant to be displayed to the user upon opening an RNA 2D
 * schema.
 *
 * Shows helpful information related to working with RNA 2D schemas
 * in RNAcanvas.
 */
export class OnOpenRNA2DInfoDialog {
  _domNode: HTMLElement;

  constructor(args: ConstructorArgs) {
    let { domNode, closeButton } = args;

    this._domNode = domNode;

    closeButton.addEventListener('click', () => this._hide());
  }

  /**
   * Adds the DOM node of this on-open RNA 2D info dialog to the
   * document body.
   */
  show() {
    document.body.appendChild(this._domNode);
  }

  _hide() {
    this._domNode.remove();
  }
}
