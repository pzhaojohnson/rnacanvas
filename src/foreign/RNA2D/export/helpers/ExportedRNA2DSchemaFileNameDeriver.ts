export type Config = {
  theDocumentForTheWholeApp: {
    title: string;
  }
};

/**
 * Determines what the name of an exported RNA 2D schema file should
 * be given the current state of the app.
 */
export class ExportedRNA2DSchemaFileNameDeriver {
  _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  /**
   * Returns the title of the app document (if it is truthy) with the
   * ".json" extension appended to it.
   *
   * Otherwise returns the string "molecule.json" if the app document
   * title is falsy.
   */
  derive(): string {
    if (this._config.theDocumentForTheWholeApp.title) {
      return this._config.theDocumentForTheWholeApp.title + '.json';
    } else {
      return 'molecule.json';
    }
  }
}
