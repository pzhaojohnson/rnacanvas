import { RNA2DOpenErrorDialog } from './RNA2DOpenErrorDialog';

import { RNA2DOpenErrorDialogBuilder } from './RNA2DOpenErrorDialogBuilder';

describe('RNA2DOpenErrorDialogBuilder class', () => {
  describe('build method', () => {
    it('returns an unable-to-open error dialog', () => {
      let builder = new RNA2DOpenErrorDialogBuilder();
      expect(builder.build()).toBeInstanceOf(RNA2DOpenErrorDialog);
    });
  });
});
