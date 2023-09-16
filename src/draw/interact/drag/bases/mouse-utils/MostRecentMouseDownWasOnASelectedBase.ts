export interface MostRecentMouseDownTracker {
  /**
   * Returns the most recent mouse down event (or undefined if there
   * have yet to be any mouse down events).
   */
  provide(): MouseEvent | undefined;
}

export interface SelectedBasesGetter<Base> {
  /**
   * Returns the currently selected bases.
   */
  get(): Base[];
}

export interface MouseDownWasOnBaseChecker<Base> {
  /**
   * Returns true if the mouse down event was on the given base
   * and false otherwise.
   */
  checkFor(args: { base: Base, mouseDown: MouseEvent }): boolean;
}

export type CtorParams<Base> = {
  mostRecentMouseDownTracker: MostRecentMouseDownTracker;

  selectedBasesGetter: SelectedBasesGetter<Base>;

  mouseDownWasOnBaseChecker: MouseDownWasOnBaseChecker<Base>;
};

export class MostRecentMouseDownWasOnASelectedBase<Base> {
  _mostRecentMouseDownTracker: MostRecentMouseDownTracker;

  _selectedBasesGetter: SelectedBasesGetter<Base>;

  _mouseDownWasOnBaseChecker: MouseDownWasOnBaseChecker<Base>;

  constructor(args: CtorParams<Base>) {
    this._mostRecentMouseDownTracker = args.mostRecentMouseDownTracker;

    this._selectedBasesGetter = args.selectedBasesGetter;

    this._mouseDownWasOnBaseChecker = args.mouseDownWasOnBaseChecker;
  }

  isTrue(): boolean {
    let mostRecentMouseDown = this._mostRecentMouseDownTracker.provide();

    if (!mostRecentMouseDown) {
      return false;
    }

    // known to not be undefined
    let mostRecentMouseDown_ = mostRecentMouseDown;

    let selectedBases = this._selectedBasesGetter.get();

    return selectedBases.some(b => (
      this._mouseDownWasOnBaseChecker.checkFor({
        base: b,
        mouseDown: mostRecentMouseDown_,
      })
    ));
  }
}
