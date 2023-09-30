import { ContactButtonFactory } from './ContactButtonFactory';

describe('ContactButtonFactory class', () => {
  describe('producePositioned method', () => {
    it('returns an HTML element', () => {
      let contactButtonFactory = new ContactButtonFactory();
      let contactButton = contactButtonFactory.producePositioned();
      expect(contactButton).toBeInstanceOf(HTMLElement);
    });
  });
});
