import { OnOpenRNA2DInfoDialog } from './OnOpenRNA2DInfoDialog';

let domNode = null;

let closeButton = null;

let onOpenRNA2DInfoDialog = null;

beforeEach(() => {
  domNode = document.createElement('div');

  closeButton = {
    addEventListener: () => {},
  };

  onOpenRNA2DInfoDialog = new OnOpenRNA2DInfoDialog({
    domNode,
    closeButton,
  });
});

afterEach(() => {
  onOpenRNA2DInfoDialog = null;

  closeButton = null;

  domNode = null;
});

describe('OnOpenRNA2DInfoDialog class', () => {
  describe('show method', () => {
    it('adds DOM node to document body', () => {
      domNode.textContent = '9923refksdjhf89239r';

      expect(document.body.textContent).not.toMatch('9923refksdjhf89239r');
      onOpenRNA2DInfoDialog.show();
      expect(document.body.textContent).toMatch('9923refksdjhf89239r');
    });
  });

  it('removes DOM node on close button click', () => {
    let domNode = document.createElement('div');
    domNode.textContent = 'kds98fu293hrkjfdaf';

    let clickListener = null;

    let closeButton = {
      addEventListener: jest.fn((name, listener) => {
        expect(name).toBe('click');
        clickListener = listener;
      }),
    };

    let onOpenRNA2DInfoDialog = new OnOpenRNA2DInfoDialog({
      domNode, closeButton,
    });

    expect(closeButton.addEventListener).toHaveBeenCalledTimes(1);

    onOpenRNA2DInfoDialog.show();
    expect(document.body.textContent).toMatch('kds98fu293hrkjfdaf');

    clickListener();
    expect(document.body.textContent).not.toMatch('kds98fu293hrkjfdaf');
  });
});
