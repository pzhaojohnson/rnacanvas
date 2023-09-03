export interface Decider {
  decide(): boolean;
}

export interface SelectedBasesGetter<Base> {
  /**
   * Returns the currently selected bases.
   */
  get(): Base[];
}

export interface BasesShifter<Base> {
  /**
   * Shifts the given bases by the given X and Y coordinate amounts.
   */
  shiftBases(args: { bases: Base[], x: number, y: number }): void;
}

export interface BasesShiftCalculator {
  /**
   * Calculates how much the selected bases should be shifted
   * in response to the given mouse up event.
   */
  calculateFor(mouseUp: MouseEvent): { x: number, y: number };
}

export type MouseUpHandlerCtorParams<Base> = {
  /**
   * Decides whether mouse up events should be responded to or
   * ignored.
   */
  shouldRespondToMouseUpDecider: Decider;

  selectedBasesGetter: SelectedBasesGetter<Base>;

  basesShifter: BasesShifter<Base>;

  basesShiftCalculator: BasesShiftCalculator;
};

export class MouseUpHandler<Base> {
  _shouldRespondToMouseUpDecider: Decider;

  _selectedBasesGetter: SelectedBasesGetter<Base>;

  _basesShifter: BasesShifter<Base>;

  _basesShiftCalculator: BasesShiftCalculator;

  constructor(args: MouseUpHandlerCtorParams<Base>) {
    this._shouldRespondToMouseUpDecider = args.shouldRespondToMouseUpDecider;

    this._selectedBasesGetter = args.selectedBasesGetter;

    this._basesShifter = args.basesShifter;

    this._basesShiftCalculator = args.basesShiftCalculator;
  }

  handle(mouseUp: MouseEvent) {
    if (!this._shouldRespondToMouseUpDecider.decide()) {
      return;
    }

    let selectedBases = this._selectedBasesGetter.get();

    let { x, y } = this._basesShiftCalculator.calculateFor(mouseUp);

    this._basesShifter.shiftBases({ bases: selectedBases, x, y });
  }
}
