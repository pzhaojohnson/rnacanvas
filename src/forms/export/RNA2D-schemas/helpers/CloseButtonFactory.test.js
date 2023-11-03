import { CloseButtonFactory } from './CloseButtonFactory';

describe('CloseButtonFactory class', () => {
  describe('produceUsing method', () => {
    it('returns something truthy without throwing', () => {
      let closeButtonFactory = new CloseButtonFactory();

      let closeButton = closeButtonFactory.produceUsing({ document });

      expect(closeButton).toBeTruthy();
    });
  });
});
