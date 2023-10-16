import { FileDownloader } from './FileDownloader';

describe('FileDownloader class', () => {
  describe('offerForDownload method', () => {
    it('forwards file attributes to the offer-file-for-download function', () => {
      let offerFileForDownload = jest.fn();

      let fileDownloader = new FileDownloader({ offerFileForDownload });

      fileDownloader.offerForDownload('file attributes - 29834r9qiuewa');

      expect(offerFileForDownload).toHaveBeenCalledTimes(1);
      expect(offerFileForDownload.mock.calls[0][0]).toBe('file attributes - 29834r9qiuewa');
    });
  });
});
