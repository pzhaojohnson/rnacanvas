import { RNAcanvasReferencesDialogFactory } from './RNAcanvasReferencesDialogFactory';

let closeButton = null;

let rnaCanvasReferencesDialogFactory = null;

beforeEach(() => {
  closeButton = document.createElement('p');
  closeButton.textContent = 'Close';

  rnaCanvasReferencesDialogFactory = new RNAcanvasReferencesDialogFactory({
    closeButton,
  });
});

afterEach(() => {
  rnaCanvasReferencesDialogFactory = null;

  closeButton = null;
});

describe('RNAcanvasReferencesDialogFactory class', () => {
  describe('produce method', () => {
    it('returns an HTML element', () => {
      let produced = rnaCanvasReferencesDialogFactory.produce();
      expect(produced).toBeInstanceOf(HTMLElement);
    });

    it('includes close button inside produced element', () => {
      let closeButton = document.createElement('p');
      closeButton.textContent = 'Close button - 1274y73ieuw';

      let rnaCanvasReferencesDialogFactory = new RNAcanvasReferencesDialogFactory({
        closeButton,
      });

      let produced = rnaCanvasReferencesDialogFactory.produce();

      expect(produced.textContent).toMatch('Close button - 1274y73ieuw');
    });
  });
});
