import { CloseButtonFactory } from './CloseButtonFactory';

let closeButtonFactory = null;

beforeEach(() => {
  closeButtonFactory = new CloseButtonFactory();
});

afterEach(() => {
  closeButtonFactory = null;
});

describe('CloseButtonFactory class', () => {
  describe('produce method', () => {
    it('returns an HTML element', () => {
      let closeButton = closeButtonFactory.produce();
      expect(closeButton).toBeInstanceOf(HTMLElement);
    });
  });
});
