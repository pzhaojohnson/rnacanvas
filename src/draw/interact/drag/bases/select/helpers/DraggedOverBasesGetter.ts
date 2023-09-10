export interface MostRecentMouseDownTracker {
  /**
   * Returns the most recent mouse down event (or undefined if there
   * have not been any mouse down events).
   */
  provide(): MouseEvent | undefined;
}

export interface TargetBaseOfMouseEventGetter<Base> {
  /**
   * Returns the base that the mouse event was on (or undefined if
   * the mouse event was not on a base).
   */
  getFor(event: MouseEvent): Base | undefined;
}

export interface SpannedBasesGetter<Base> {
  /**
   * Returns the bases spanned by the given two bases (as well as
   * the two bases themselves) based on how bases are ordered in
   * the relevant drawing (e.g., with regards to sequences in the
   * drawing).
   */
  getFor(base1: Base, base2: Base): Base[];
}

export type DraggedOverBasesGetterCtorParams<Base> = {
  mostRecentMouseDownTracker: MostRecentMouseDownTracker;

  targetBaseOfMouseEventGetter: TargetBaseOfMouseEventGetter<Base>;

  spannedBasesGetter: SpannedBasesGetter<Base>;
}

export class DraggedOverBasesGetter<Base> {
  _mostRecentMouseDownTracker: MostRecentMouseDownTracker;

  _targetBaseOfMouseEventGetter: TargetBaseOfMouseEventGetter<Base>;

  _spannedBasesGetter: SpannedBasesGetter<Base>;

  constructor(args: DraggedOverBasesGetterCtorParams<Base>) {
    this._mostRecentMouseDownTracker = args.mostRecentMouseDownTracker;

    this._targetBaseOfMouseEventGetter = args.targetBaseOfMouseEventGetter;

    this._spannedBasesGetter = args.spannedBasesGetter;
  }

  /**
   * Returns the bases that the user has dragged over with the mouse
   * given the mouse over event.
   */
  getFor(mouseOver: MouseEvent): Base[] {
    let mostRecentMouseDown = this._mostRecentMouseDownTracker.provide();

    if (!mostRecentMouseDown) {
      return [];
    }

    let mouseDownedBase = this._targetBaseOfMouseEventGetter.getFor(mostRecentMouseDown);

    if (!mouseDownedBase) {
      return [];
    }

    let mouseOveredBase = this._targetBaseOfMouseEventGetter.getFor(mouseOver);

    if (!mouseOveredBase) {
      return [];
    }

    return this._spannedBasesGetter.getFor(mouseDownedBase, mouseOveredBase);
  }
}
