import { RNA2DOpenErrorDialog } from './RNA2DOpenErrorDialog';

let domNode = null;

let closeButton = null;

let errorDialog = null;

beforeEach(() => {
  domNode = document.createElement('div');

  closeButton = {
    addEventListener: () => {},
  };

  errorDialog = new RNA2DOpenErrorDialog({
    domNode,
    closeButton,
  });
});

afterEach(() => {
  errorDialog = null;

  closeButton = null;

  domNode = null;
});

describe('RNA2DOpenErrorDialog class', () => {
  describe('show method', () => {
    it('adds DOM node to the document body', () => {
      expect(document.body.contains(domNode)).toBeFalsy();
      errorDialog.show();
      expect(document.body.contains(domNode)).toBeTruthy();
    });
  });

  it('binds close button click event', () => {
    let domNode = document.createElement('div');

    let closeButton = {
      addEventListener: jest.fn((eventName, callback) => {
        expect(eventName).toBe('click');
        expect(typeof callback).toBe('function');
      }),
    };

    new RNA2DOpenErrorDialog({ domNode, closeButton });

    expect(closeButton.addEventListener).toHaveBeenCalledTimes(1);
  });

  it('closes itself on close button click', () => {
    let domNode = document.createElement('div');

    let clickCallback = null;

    let closeButton = {
      addEventListener: jest.fn((eventName, callback) => {
        expect(eventName).toBe('click');
        clickCallback = callback;
      }),
    };

    let errorDialog = new RNA2DOpenErrorDialog({
      domNode, closeButton,
    });

    errorDialog.show();
    expect(document.body.contains(domNode)).toBeTruthy();

    clickCallback();
    expect(document.body.contains(domNode)).toBeFalsy();
  });
});
