import { RNA2DSchemaExporter } from './RNA2DSchemaExporter';

let serializedRNA2DSchemaDeriver = null;

let exportedFileNameDeriver = null;

let fileDownloader = null;

let rna2DSchemaExporter = null;

beforeEach(() => {
  serializedRNA2DSchemaDeriver = {
    derive: () => '',
  };

  exportedFileNameDeriver = {
    derive: () => '',
  };

  fileDownloader = {
    offerForDownload: () => {},
  };

  rna2DSchemaExporter = new RNA2DSchemaExporter({
    serializedRNA2DSchemaDeriver,
    exportedFileNameDeriver,
    fileDownloader,
  });
});

afterEach(() => {
  rna2DSchemaExporter = null;

  fileDownloader = null;

  exportedFileNameDeriver = null;

  serializedRNA2DSchemaDeriver = null;
});

describe('RNA2DSchemaExporter class', () => {
  describe('export method', () => {
    it('offers for download a file containing the derived RNA 2D schema serialization', () => {
      serializedRNA2DSchemaDeriver.derive = () => 'xmdskfhou90u3r29ojsklaf';

      fileDownloader.offerForDownload = jest.fn();

      rna2DSchemaExporter.export();

      expect(fileDownloader.offerForDownload).toHaveBeenCalledTimes(1);
      expect(fileDownloader.offerForDownload.mock.calls[0][0].contents).toBe('xmdskfhou90u3r29ojsklaf');
    });

    it('offers for download a file with the name derived by the exported-file-name deriver', () => {
      exportedFileNameDeriver.derive = () => 'od9193h2irfkenjsadf.txt';

      fileDownloader.offerForDownload = jest.fn();

      rna2DSchemaExporter.export();

      expect(fileDownloader.offerForDownload).toHaveBeenCalledTimes(1);
      expect(fileDownloader.offerForDownload.mock.calls[0][0].name).toBe('od9193h2irfkenjsadf.txt');
    });

    it('offers for download a plain text file', () => {
      fileDownloader.offerForDownload = jest.fn();

      rna2DSchemaExporter.export();

      expect(fileDownloader.offerForDownload).toHaveBeenCalledTimes(1);
      expect(fileDownloader.offerForDownload.mock.calls[0][0].type).toBe('text/plain');
    });
  });
});
