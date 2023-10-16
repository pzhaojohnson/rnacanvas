export type PlainTextFileAttributes = {
  name: string;
  type: 'text/plain';
  contents: string;
};

export type Config = {
  serializedRNA2DSchemaDeriver: {
    /**
     * Derives an RNA 2D schema from the relevant RNAcanvas drawing
     * and returns the serialized form of the derived RNA 2D schema.
     */
    derive(): string;
  };

  exportedFileNameDeriver: {
    /**
     * Returns the name to assign to the file that will contain the
     * exported RNA 2D schema.
     */
    derive(): string;
  }

  fileDownloader: {
    /**
     * Offers a file with the provided attributes to the user for
     * download.
     */
    offerForDownload(attrs: PlainTextFileAttributes): void;
  }
};

export class RNA2DSchemaExporter {
  _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  export() {
    this._config.fileDownloader.offerForDownload({
      name: this._config.exportedFileNameDeriver.derive(),
      type: 'text/plain',
      contents: this._config.serializedRNA2DSchemaDeriver.derive(),
    });
  }
}
