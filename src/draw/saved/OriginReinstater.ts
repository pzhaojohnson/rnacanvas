export interface Drawing {
  /**
   * A way to indicate what the drawing was initially produced from.
   *
   * Is expected to be a string.
   */
  origin?: (
    'rna-2d-schema'
    | string
    | unknown
  );
}

export type ReinstateOriginMethodArgs = {
  /**
   * The drawing to reinstate the origin for.
   */
  drawing: Drawing;

  /**
   * Expected to be an object with an optional origin property.
   */
  savedDrawing: (
    unknown
    | { origin: undefined }
    | { origin: 'rna-2d-schema' }
  );
};

export class OriginReinstater {
  /**
   * Sets the origin of the drawing to the saved origin (if present).
   */
  reinstateOrigin(args: ReinstateOriginMethodArgs) {
    let { drawing, savedDrawing } = args;

    let savedOrigin: unknown = undefined;

    // enclose any type cast
    try {
      savedOrigin = (savedDrawing as any).origin;
    } catch {}

    if (savedOrigin === 'rna-2d-schema') {
      drawing.origin = savedOrigin;
    }
  }
}
