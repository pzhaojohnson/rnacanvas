export interface FullAppURLKnower {
  /**
   * A property that always holds the current full app URL (including
   * search parameters).
   */
  readonly URL: string;
}

export interface SearchParamsRemover {
  /**
   * Removes all search parameters from the URL string and returns the
   * new URL string.
   *
   * Should simply return the input URL string if it does not contain
   * any search parameters.
   */
  removeAll(url: string): string;
}

export type ConstructorArgs = {
  fullAppURLKnower: FullAppURLKnower;

  searchParamsRemover: SearchParamsRemover;
};

export class BaseAppURLProvider {
  readonly _fullAppURLKnower: FullAppURLKnower;

  readonly _searchParamsRemover: SearchParamsRemover;

  constructor(args: ConstructorArgs) {
    let { fullAppURLKnower, searchParamsRemover } = args;

    this._fullAppURLKnower = fullAppURLKnower;

    this._searchParamsRemover = searchParamsRemover;
  };

  /**
   * Returns the URL of the app with any search parameters removed.
   */
  provide(): string {
    return this._searchParamsRemover.removeAll(
      this._fullAppURLKnower.URL
    );
  }
}
