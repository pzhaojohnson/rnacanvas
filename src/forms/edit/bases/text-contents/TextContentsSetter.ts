export interface Base {
  text: {
    /**
     * Sets the text content of the text element of the base to the
     * given string.
     *
     * Not expected to return anything.
     */
    text(s: string): void | unknown;
  }
}

export interface UndoStackPusher {
  /**
   * Pushes the relevant undo stack.
   *
   * To be called before setting the text contents of the subject
   * bases.
   */
  push(): void;
}

export interface AppRefresher {
  /**
   * Refreshes the relevant app instance.
   *
   * To be called after setting the text contents of the subject
   * bases.
   */
  refresh(): void;
}

export type ConstructorArgs = {
  /**
   * The bases to set the contents of.
   */
  bases: Base[];

  undoStackPusher: UndoStackPusher;

  appRefresher: AppRefresher;
};

export class TextContentsSetter {
  readonly _bases: Base[];

  readonly _undoStackPusher: UndoStackPusher;

  readonly _appRefresher: AppRefresher;

  constructor(args: ConstructorArgs) {
    let { bases, undoStackPusher, appRefresher } = args;

    this._bases = bases;

    this._undoStackPusher = undoStackPusher;

    this._appRefresher = appRefresher;
  }

  /**
   * Sets the text contents of the bases for this text contents setter
   * to the provided string value.
   *
   * (Trims leading and trailing whitespace from the provided string
   * value before setting the text contents of the bases.)
   */
  set(value: string) {
    // remove leading and trailing whitespace
    value = value.trim();

    this._undoStackPusher.push();

    this._bases.forEach(b => b.text.text(value));

    this._appRefresher.refresh();
  }
}
