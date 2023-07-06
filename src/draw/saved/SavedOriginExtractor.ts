/**
 * Expected to be an object with an optional origin string property.
 *
 * Could potentially be anything, though, since could be read in from
 * a file.
 */
export type SavedDrawing = (
  unknown
  | {}
  | { origin: undefined }
  | { origin: string }
);

export type SavedOrigin = (
  string
  | undefined
);

export class SavedOriginExtractor {
  /**
   * Extracts the origin of the saved drawing.
   *
   * Returns undefined if the saved drawing does not include an
   * origin.
   */
  extract(savedDrawing: SavedDrawing): SavedOrigin {
    let savedOrigin: unknown = undefined;

    // enclose any type cast
    try {
      savedOrigin = (savedDrawing as any).origin;
    } catch {}

    if (typeof savedOrigin == 'string') {
      return savedOrigin;
    } else {
      return undefined;
    }
  }
}
