export interface CloseButton {
  /**
   * Used to bind the click event to a callback function.
   *
   * Not expected to return anything.
   */
  addEventListener(
    eventName: 'click',
    callback: () => void,
  ): void | unknown;
}

export type ConstructorArgs = {
  /**
   * The actual underlying DOM node that is the unable-to-open error
   * dialog.
   *
   * Is expected to already have CSS styles that will position the
   * error dialog on the screen and place the error dialog on top of
   * everything else when the error dialog is added to the document
   * body.
   */
  domNode: HTMLElement;

  /**
   * The button to control the closing of the unable-to-open error
   * dialog.
   *
   * Will have a click event listener added to it.
   */
  closeButton: CloseButton;
};

/**
 * An error dialog that can be shown when the app is unable to open an
 * RNA 2D schema.
 */
export class RNA2DOpenErrorDialog {
  readonly _domNode: HTMLElement;

  readonly _closeButton: CloseButton;

  constructor(args: ConstructorArgs) {
    let { domNode, closeButton } = args;

    this._domNode = domNode;
    this._closeButton = closeButton;

    closeButton.addEventListener('click', () => {
      domNode.remove();
    });
  }

  /**
   * Shows the error dialog to the user.
   *
   * The error dialog will have its own close button to allow the user
   * to close the error dialog.
   */
  show() {
    document.body.appendChild(this._domNode);
  }
}
