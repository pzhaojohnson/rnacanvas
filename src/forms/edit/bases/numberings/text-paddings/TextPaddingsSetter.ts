export interface BaseNumbering {
  textPadding: number;
}

export interface UndoStackPusher {
  /**
   * Pushes the undo stack.
   */
  push(): void;
}

export interface AppRefresher {
  /**
   * Refreshes the app.
   */
  refresh(): void;
}

export type ConstructorArgs = {
  /**
   * The base numberings to set the text paddings for.
   */
  baseNumberings: BaseNumbering[];

  undoStackPusher: UndoStackPusher;

  appRefresher: AppRefresher;
};

export class TextPaddingsSetter {
  readonly _baseNumberings: BaseNumbering[];

  readonly _undoStackPusher: UndoStackPusher;

  readonly _appRefresher: AppRefresher;

  constructor(args: ConstructorArgs) {
    let { baseNumberings, undoStackPusher, appRefresher } = args;

    this._baseNumberings = baseNumberings;

    this._undoStackPusher = undoStackPusher;

    this._appRefresher = appRefresher;
  }

  /**
   * Sets the text paddings of the base numberings to the provided
   * value.
   *
   * Pushes the undo stack before setting any text paddings and
   * refreshes the app afterwards.
   */
  set(value: number) {
    this._undoStackPusher.push();

    this._baseNumberings.forEach(bn => {
      bn.textPadding = value;
    });

    this._appRefresher.refresh();
  }
}
