export type ConstructorArgs = {
  /**
   * The RNAcanvas references dialog element to show to the user.
   *
   * Is expected to already have CSS styles to position it on the
   * screen and place it on top of everything else when added to
   * the DOM.
   */
  rnaCanvasReferencesDialog: HTMLElement;
};

export class RNAcanvasReferencesDialogShower {
  _rnaCanvasReferencesDialog: HTMLElement;

  constructor(args: ConstructorArgs) {
    let { rnaCanvasReferencesDialog } = args;

    this._rnaCanvasReferencesDialog = rnaCanvasReferencesDialog;
  }

  /**
   * Shows an RNAcanvas references dialog to the user.
   */
  show() {
    document.body.appendChild(this._rnaCanvasReferencesDialog);
  }
}
