import { RNAcanvasReferencesDialogShower } from './RNAcanvasReferencesDialogShower';

import { RNAcanvasReferencesDialogShowerBuilder } from './RNAcanvasReferencesDialogShowerBuilder';

describe('RNAcanvasReferencesDialogShowerBuilder class', () => {
  describe('build method', () => {
    it('returns an RNAcanvas references dialog shower', () => {
      let builder = new RNAcanvasReferencesDialogShowerBuilder();
      let built = builder.build();
      expect(built).toBeInstanceOf(RNAcanvasReferencesDialogShower);
    });
  });
});
