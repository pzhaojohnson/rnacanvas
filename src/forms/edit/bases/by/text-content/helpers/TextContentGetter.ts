import { Base } from './Base';

export class TextContentGetter {
  /**
   * Returns the text content of the given base.
   */
  getFor(b: Base): string {
    return b.text.text();
  }
}
