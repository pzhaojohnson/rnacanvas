export interface AllBasesGetter<Base> {
  /**
   * Returns all bases in the relevant drawing.
   */
  get(): Base[];
}

export interface MouseEventWasOnBaseChecker<Base> {
  /**
   * Returns true if the mouse event was on the base and false
   * otherwise.
   */
  checkFor(args: { base: Base, mouseEvent: MouseEvent }): boolean;
}

export type TargetBaseOfMouseEventGetterCtorParams<Base> = {
  allBasesGetter: AllBasesGetter<Base>;

  mouseEventWasOnBaseChecker: MouseEventWasOnBaseChecker<Base>;
};

export class TargetBaseOfMouseEventGetter<Base> {
  _allBasesGetter: AllBasesGetter<Base>;

  _mouseEventWasOnBaseChecker: MouseEventWasOnBaseChecker<Base>;

  constructor(args: TargetBaseOfMouseEventGetterCtorParams<Base>) {
    this._allBasesGetter = args.allBasesGetter;

    this._mouseEventWasOnBaseChecker = args.mouseEventWasOnBaseChecker;
  }

  /**
   * Returns the base (in the relevant drawing) that the mouse event
   * was on (or undefined if the mouse event was not on a base).
   */
  getFor(mouseEvent: MouseEvent): Base | undefined {
    let allBases = this._allBasesGetter.get();

    return allBases.find(b => (
      this._mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent })
    ));
  }
}
