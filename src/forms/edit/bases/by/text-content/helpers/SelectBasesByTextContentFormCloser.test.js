import { SelectBasesByTextContentFormCloser } from './SelectBasesByTextContentFormCloser';

describe('SelectBasesByTextContentFormCloser class', () => {
  describe('close method', () => {
    it('calls the close callback', () => {
      let closeCallback = jest.fn();
      let closer = new SelectBasesByTextContentFormCloser({ closeCallback });

      expect(closeCallback).not.toHaveBeenCalled();

      closer.close();

      expect(closeCallback).toHaveBeenCalledTimes(1);
    });
  });
});
