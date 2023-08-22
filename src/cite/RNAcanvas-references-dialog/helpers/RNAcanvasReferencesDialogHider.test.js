import { RNAcanvasReferencesDialogHider } from './RNAcanvasReferencesDialogHider';

describe('RNAcanvasReferencesDialogHider class', () => {
  it('removes the dialog from the DOM on close button click', () => {
    let rnaCanvasReferencesDialog = {
      remove: jest.fn(),
    };

    let closeButtonClickListener = null;

    let closeButton = {
      addEventListener: jest.fn((name, listener) => {
        expect(name).toBe('click');
        closeButtonClickListener = listener;
      }),
    };

    let hider = new RNAcanvasReferencesDialogHider({
      rnaCanvasReferencesDialog, closeButton,
    });

    expect(closeButton.addEventListener).toHaveBeenCalledTimes(1);

    expect(rnaCanvasReferencesDialog.remove).not.toHaveBeenCalled();
    closeButtonClickListener();
    expect(rnaCanvasReferencesDialog.remove).toHaveBeenCalledTimes(1);
  });
});
