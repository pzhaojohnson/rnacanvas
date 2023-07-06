export interface Drawing {
  /**
   * Is expected to hold a string indicating what the drawing was
   * initially produced from.
   */
  origin?: (
    'rna-2d-schema'
    | string
    | unknown
  );
}

export class DrawingOriginSetter {
  /**
   * Sets the origin of the drawing to indicate that the drawing was
   * initially produced from an RNA 2D schema.
   */
  setOriginToAnRNA2DSchema(drawing: Drawing) {
    drawing.origin = 'rna-2d-schema';
  }
}
