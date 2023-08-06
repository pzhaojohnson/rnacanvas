import { CloseButtonFactory } from './CloseButtonFactory';

describe('CloseButtonFactory class', () => {
  describe('produce method', () => {
    it('returns an HTML element', () => {
      let factory = new CloseButtonFactory();
      let closeButton = factory.produce();
      expect(closeButton).toBeInstanceOf(HTMLElement);
    });
  });
});
