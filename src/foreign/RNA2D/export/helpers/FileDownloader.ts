export type Helpers<FileAttributes> = {
  /**
   * Offers a file with the provided attributes to the user for
   * download.
   */
  offerFileForDownload: (fileAttrs: FileAttributes) => void;
};

/**
 * Basically just adapts an offer-file-for-download function.
 */
export class FileDownloader<FileAttributes> {
  _helpers: Helpers<FileAttributes>;

  constructor(helpers: Helpers<FileAttributes>) {
    this._helpers = helpers;
  }

  /**
   * Offers a file with the provided attributes to the user for
   * download.
   */
  offerForDownload(fileAttrs: FileAttributes) {
    this._helpers.offerFileForDownload(fileAttrs);
  }
}
