import { CloseButtonFactory } from './CloseButtonFactory';

describe('CloseButtonFactory class', () => {
  describe('produce method', () => {
    it('returns an HTML element', () => {
      let closeButtonFactory = new CloseButtonFactory();
      let closeButton = closeButtonFactory.produce();
      expect(closeButton).toBeInstanceOf(HTMLElement);
    });
  });
});
