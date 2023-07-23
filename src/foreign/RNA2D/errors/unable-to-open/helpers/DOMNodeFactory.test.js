import { DOMNodeFactory } from './DOMNodeFactory';

let factory = null;

beforeEach(() => {
  factory = new DOMNodeFactory();
});

afterEach(() => {
  factory = null;
});

describe('DOMNodeFactory class', () => {
  describe('produce method', () => {
    it('returns an HTML element', () => {
      let domNode = factory.produce();
      expect(domNode).toBeInstanceOf(HTMLElement);
    });

    it('includes the specified close button', () => {
      let closeButton = document.createElement('p');
      closeButton.textContent = 'Close button - 183195789f238';
      factory.useThisCloseButton(closeButton);

      let domNode = factory.produce();
      expect(domNode.textContent).toMatch('Close button - 183195789f238');
    });
  });
});
