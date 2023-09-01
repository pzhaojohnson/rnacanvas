export interface Point {
  x: number;
  y: number;
}

export interface Base {
  getCenter(): Point;

  setCenter(center: Point): Point;
}

export interface Tasks {
  /**
   * Does the encapsulated tasks.
   */
  do(): void;
}

type BasesShifterConstructorParameters = {
  /**
   * Follow-up tasks that will be done after bases are moved.
   */
  tasksToDoAfterMovingBases: Tasks;
};

export class BasesShifter {
  _tasksToDoAfterMovingBases: Tasks;

  constructor(args: BasesShifterConstructorParameters) {
    this._tasksToDoAfterMovingBases = args.tasksToDoAfterMovingBases;
  }

  /**
   * Shifts the provided bases by the provided X and Y coordinate
   * amounts.
   */
  shiftBases(args: { bases: Base[], x: number, y: number }) {
    let { bases, x, y } = args;

    bases.forEach(b => {
      let center = b.getCenter();
      let shiftedX = center.x + x;
      let shiftedY = center.y + y;
      b.setCenter({ x: shiftedX, y: shiftedY });
    });

    this._tasksToDoAfterMovingBases.do();
  }
}
