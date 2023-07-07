export class SearchParamsRemover {
  /**
   * Removes all search parameters from the URL string and returns the
   * new URL string.
   *
   * Returns the input URL string if it does not contain any search
   * parameters.
   */
  removeAll(url: string): string {
    let i = url.indexOf('?');

    if (i < 0) {
      return url;
    } else {
      return url.substring(0, i);
    }
  }
}
