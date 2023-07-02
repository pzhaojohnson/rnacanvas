/**
 * Is expected to be an object with a text padding number property but
 * could be anything since could be read in from a saved file.
 *
 * The text padding property also used to not be included with saved
 * base numberings in earlier versions of the app.
 */
export type SavedBaseNumbering = (
  unknown
  | { textPadding: number; }
  | { textPadding: undefined; }
)

export class TextPaddingRememberer {
  /**
   * Returns the saved text padding property (if present and valid).
   *
   * Returns 4 by default otherwise.
   *
   * (Text padding used to always be 4 before it was customizable and
   * included with saved base numberings.)
   */
  remember(saved: SavedBaseNumbering) {
    try {
      let textPadding: unknown = (saved as any).textPadding;

      if (typeof textPadding != 'number') {
        throw new Error(`${textPadding} is not a number.`);
      }

      return textPadding;
    } catch {
      return 4;
    }
  }
}
