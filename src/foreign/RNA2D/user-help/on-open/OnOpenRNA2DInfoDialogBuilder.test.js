import { OnOpenRNA2DInfoDialog } from './OnOpenRNA2DInfoDialog';

import { OnOpenRNA2DInfoDialogBuilder } from './OnOpenRNA2DInfoDialogBuilder';

describe('OnOpenRNA2DInfoDialogBuilder class', () => {
  describe('build method', () => {
    it('returns an on-open RNA 2D info dialog', () => {
      let builder = new OnOpenRNA2DInfoDialogBuilder();
      let built = builder.build();
      expect(built).toBeInstanceOf(OnOpenRNA2DInfoDialog);
    });
  });
});
