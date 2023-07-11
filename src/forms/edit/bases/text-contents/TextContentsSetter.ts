import type { Base } from './SingleTextContentSetter';

/**
 * Sets the text content of a single base.
 */
export interface SingleTextContentSetter {
  /**
   * Sets the text content of the base to the provided text content.
   */
  set(args: { base: Base, textContent: string }): void;
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

  /**
   * Used to set the text content of each base.
   */
  singleTextContentSetter: SingleTextContentSetter;

  undoStackPusher: UndoStackPusher;

  appRefresher: AppRefresher;
};

export class TextContentsSetter {
  readonly _bases: Base[];

  readonly _singleTextContentSetter: SingleTextContentSetter;

  readonly _undoStackPusher: UndoStackPusher;

  readonly _appRefresher: AppRefresher;

  constructor(args: ConstructorArgs) {
    this._bases = args.bases;
    this._singleTextContentSetter = args.singleTextContentSetter;
    this._undoStackPusher = args.undoStackPusher;
    this._appRefresher = args.appRefresher;
  }

  /**
   * Sets the text contents of the bases for this text contents setter
   * to the provided string value.
   */
  set(textContent: string) {
    this._undoStackPusher.push();

    this._bases.forEach(base => {
      this._singleTextContentSetter.set({ base, textContent });
    });

    this._appRefresher.refresh();
  }
}
