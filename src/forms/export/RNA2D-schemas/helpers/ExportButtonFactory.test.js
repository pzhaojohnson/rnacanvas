import { ExportButtonFactory } from './ExportButtonFactory';

describe('ExportButtonFactory class', () => {
  describe('produceUsing method', () => {
    it('returns something truthy without throwing', () => {
      let exportButtonFactory = new ExportButtonFactory();

      let exportButton = exportButtonFactory.produceUsing({ document });

      expect(exportButton).toBeTruthy();
    });
  });
});
