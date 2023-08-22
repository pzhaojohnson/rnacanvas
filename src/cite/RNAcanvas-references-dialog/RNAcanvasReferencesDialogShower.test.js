import { RNAcanvasReferencesDialogShower } from './RNAcanvasReferencesDialogShower';

describe('RNAcanvasReferencesDialogShower class', () => {
  describe('show method', () => {
    it('adds the dialog to the DOM', () => {
      let rnaCanvasReferencesDialog = document.createElement('p');
      rnaCanvasReferencesDialog.textContent = 'Info - 3982ruaisdkjflq3r3rf';

      let shower = new RNAcanvasReferencesDialogShower({ rnaCanvasReferencesDialog });
      shower.show();

      expect(document.body.textContent).toMatch('Info - 3982ruaisdkjflq3r3rf');
    });
  });
});
