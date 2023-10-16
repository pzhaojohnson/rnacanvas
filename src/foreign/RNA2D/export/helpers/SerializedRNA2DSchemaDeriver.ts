export type Helpers<RNA2DSchema> = {
  rna2DSchemaDeriver: {
    /**
     * Derives an RNA 2D schema from the relevant RNAcanvas drawing.
     */
    derive(): RNA2DSchema;
  }

  jsonStringifier: {
    /**
     * Serializes the input RNA 2D schema to a JSON string.
     */
    stringify(rna2DSchema: RNA2DSchema): string;
  }
};

export class SerializedRNA2DSchemaDeriver<RNA2DSchema> {
  _helpers: Helpers<RNA2DSchema>;

  constructor(helpers: Helpers<RNA2DSchema>) {
    this._helpers = helpers;
  }

  /**
   * Derives an RNA 2D schema from the relevant RNAcanvas drawing
   * and returns the derived RNA 2D schema as a serialized JSON
   * string.
   */
  derive(): string {
    let rna2DSchema = this._helpers.rna2DSchemaDeriver.derive();

    return this._helpers.jsonStringifier.stringify(rna2DSchema);
  }
}
