export interface BasesShifterToDecorate<Base> {
  /**
   * Shifts the provided bases by the provided X and Y coordinate
   * amounts.
   */
  shiftBases(args: { bases: Base[], x: number, y: number }): void;
}

export interface Tasks {
  /**
   * Does all the encapsulated tasks.
   */
  do(): void;
}

export type BasesShifterConstructorParameters<Base> = {
  /**
   * An underlying bases shifter that will perform the actual
   * operation of shifting bases.
   */
  basesShifterToDecorate: BasesShifterToDecorate<Base>;

  /**
   * Will be done immediately before shifting bases (e.g., pushing
   * an undo stack).
   */
  tasksToDoBeforeShiftingBases: Tasks;

  /**
   * Will be done immediately after shifting bases (e.g., refreshing
   * the app).
   */
  tasksToDoAfterShiftingBases: Tasks;
};

export class BasesShifter<Base> {
  _basesShifterToDecorate: BasesShifterToDecorate<Base>;

  _tasksToDoBeforeShiftingBases: Tasks;

  _tasksToDoAfterShiftingBases: Tasks;

  constructor(args: BasesShifterConstructorParameters<Base>) {
    this._basesShifterToDecorate = args.basesShifterToDecorate;

    this._tasksToDoBeforeShiftingBases = args.tasksToDoBeforeShiftingBases;

    this._tasksToDoAfterShiftingBases = args.tasksToDoAfterShiftingBases;
  }

  /**
   * Shifts the provided bases by the provided X and Y coordinate
   * amounts.
   */
  shiftBases(args: { bases: Base[], x: number, y: number }) {
    let { bases, x, y } = args;

    this._tasksToDoBeforeShiftingBases.do();

    this._basesShifterToDecorate.shiftBases({ bases, x, y });

    this._tasksToDoAfterShiftingBases.do();
  }
}
