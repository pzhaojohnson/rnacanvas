export interface Drawing {
  /**
   * Is expected to hold a string indicating the origin of the
   * drawing.
   */
  origin?: (
    'rna-2d-schema'
    | string
    | unknown
  );
}

export class DrawingOriginChecker {
  /**
   * Returns true if the drawing was initially produced from an RNA 2D
   * schema and false otherwise.
   */
  originIsAnRNA2DSchema(drawing: Drawing): boolean {
    return drawing.origin == 'rna-2d-schema';
  }
}
