import { ParentSVGDocEnsurer } from './ParentSVGDocEnsurer';

import { ParentSVGDocEnsurerBuilder } from './ParentSVGDocEnsurerBuilder';

describe('ParentSVGDocEnsurerBuilder class', () => {
  describe('build method', () => {
    it('returns a parent SVG doc ensurer', () => {
      let builder = new ParentSVGDocEnsurerBuilder();
      let built = builder.build();
      expect(built).toBeInstanceOf(ParentSVGDocEnsurer);
    });
  });
});
