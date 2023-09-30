import { CiteButtonFactory } from './CiteButtonFactory';

describe('CiteButtonFactory class', () => {
  describe('producePositioned method', () => {
    it('returns an HTML element', () => {
      let citeButtonFactory = new CiteButtonFactory();
      let citeButton = citeButtonFactory.producePositioned();
      expect(citeButton).toBeInstanceOf(HTMLElement);
    });
  });
});
