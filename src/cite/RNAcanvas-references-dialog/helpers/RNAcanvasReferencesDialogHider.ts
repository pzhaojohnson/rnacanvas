export interface RNAcanvasReferencesDialog {
  /**
   * Removes the dialog element from the DOM and thus hides the
   * dialog element from view.
   *
   * Not expected to return anything.
   */
  remove(): void | unknown;
}

export interface CloseButton {
  /**
   * To be used to bind clicks on the close button.
   *
   * Not expected to return anything.
   */
  addEventListener(name: 'click', listener: () => void): void | unknown;
}

export type ConstructorArgs = {
  rnaCanvasReferencesDialog: RNAcanvasReferencesDialog;

  closeButton: CloseButton;
};

/**
 * Hides the provided dialog element from view when the provided
 * close button is clicked.
 *
 * (Hides the dialog element from view by just removing it from
 * the DOM.)
 */
export class RNAcanvasReferencesDialogHider {
  constructor(args: ConstructorArgs) {
    let { rnaCanvasReferencesDialog, closeButton } = args;

    closeButton.addEventListener('click', () => {
      rnaCanvasReferencesDialog.remove();
    });
  }
}
