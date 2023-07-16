export interface ByTextContentBasesGetter<Base> {
  /**
   * Returns an array of all bases that have the specified text
   * content.
   */
  getWith(textContent: string): Base[];
}

export interface BasesSelector<Base> {
  /**
   * Selects the specified bases for editing within the app.
   */
  select(bases: Base[]): void;
}

export type ConstructorArgs<Base> = {
  byTextContentBasesGetter: ByTextContentBasesGetter<Base>;

  basesSelector: BasesSelector<Base>;
};

/**
 * A request by the user to select for editing bases with the
 * specified text content.
 */
export interface SelectRequest {
  /**
   * The specified text content to select bases by.
   */
  textContent: string;
}

export class SelectRequestHandler<Base> {
  readonly _byTextContentBasesGetter: ByTextContentBasesGetter<Base>;

  readonly _basesSelector: BasesSelector<Base>;

  constructor(args: ConstructorArgs<Base>) {
    let { byTextContentBasesGetter, basesSelector } = args;

    this._byTextContentBasesGetter = byTextContentBasesGetter;

    this._basesSelector = basesSelector;
  }

  /**
   * If there are no issues with the request, selects bases that have
   * the specified text content and does not throw any errors.
   *
   * Throws an error with a helpful message that can be shown to the
   * user if something is wrong with the request.
   */
  handle(request: SelectRequest): void | never {
    let textContent = request.textContent;

    // remove leading and trailing whitespace
    textContent = textContent.trim();

    if (textContent.length == 0) {
      throw new Error('Specify text.');
    }

    let bases = this._byTextContentBasesGetter.getWith(textContent);

    if (bases.length == 0) {
      throw new Error('No bases have the specified text.');
    }

    this._basesSelector.select(bases);
  }
}
