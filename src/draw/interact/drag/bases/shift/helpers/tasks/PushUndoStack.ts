export interface UndoStackPusher {
  /**
   * Pushes the relevant undo stack.
   */
  push(): void;
}

export type PushUndoStackConstructorParameters = {
  /**
   * To be used to push the relevant undo stack.
   */
  undoStackPusher: UndoStackPusher;
};

/**
 * Represents the task of pushing an undo stack (prior to editing
 * a structure drawing, for example).
 */
export class PushUndoStack {
  _undoStackPusher: UndoStackPusher;

  constructor(args: PushUndoStackConstructorParameters) {
    this._undoStackPusher = args.undoStackPusher;
  }

  do() {
    this._undoStackPusher.push();
  }
}
