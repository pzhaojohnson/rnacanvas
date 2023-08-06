import { DOMNodeFactory } from './DOMNodeFactory';

let closeButton = null;

let domNodeFactory = null;

beforeEach(() => {
  closeButton = document.createElement('button');

  domNodeFactory = new DOMNodeFactory({ closeButton });
});

afterEach(() => {
  domNodeFactory = null;

  closeButton = null;
});

describe('DOMNodeFactory class', () => {
  describe('produce method', () => {
    it('returns an HTML element', () => {
      let domNode = domNodeFactory.produce();
      expect(domNode).toBeInstanceOf(HTMLElement);
    });

    it('includes close button inside produced DOM node', () => {
      let closeButton = document.createElement('button');
      closeButton.textContent = 'Close button - 823958y3riuhwef';

      let domNodeFactory = new DOMNodeFactory({ closeButton });
      let domNode = domNodeFactory.produce();

      expect(domNode.textContent).toMatch('Close button - 823958y3riuhwef');
    });
  });
});
