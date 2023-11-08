import { RNA2DButtonFactory } from './RNA2DButtonFactory';

describe('RNA2DButtonFactory class', () => {
  describe('makeWith method', () => {
    it('returns something truthy without throwing', () => {
      let rna2DButtonFactory = new RNA2DButtonFactory();

      expect(rna2DButtonFactory.makeWith({ document })).toBeTruthy();
    });
  });
});
