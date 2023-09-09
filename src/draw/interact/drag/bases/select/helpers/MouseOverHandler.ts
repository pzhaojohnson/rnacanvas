export interface ShouldRespondToMouseOverDecider {
  /**
   * Returns true if should respond to mouse over events
   * and false otherwise.
   */
  decide(): boolean;
}

export interface DraggedOverBasesGetter<Base> {
  /**
   * Returns the bases that have been dragged over given the mouse
   * over event.
   */
  getFor(mouseOver: MouseEvent): Base[];
}

export interface BasesSelector<Base> {
  /**
   * Adds the bases to the collection of selected elements.
   *
   * Bases that were already selected should remain selected.
   */
  addToSelected(bases: Base[]): void;
}

export type MouseOverHandlerCtorParams<Base> = {
  shouldRespondToMouseOverDecider: ShouldRespondToMouseOverDecider;

  draggedOverBasesGetter: DraggedOverBasesGetter<Base>;

  basesSelector: BasesSelector<Base>;
};

export class MouseOverHandler<Base> {
  _shouldRespondToMouseOverDecider: ShouldRespondToMouseOverDecider;

  _draggedOverBasesGetter: DraggedOverBasesGetter<Base>;

  _basesSelector: BasesSelector<Base>;

  constructor(args: MouseOverHandlerCtorParams<Base>) {
    this._shouldRespondToMouseOverDecider = args.shouldRespondToMouseOverDecider;

    this._draggedOverBasesGetter = args.draggedOverBasesGetter;

    this._basesSelector = args.basesSelector;
  }

  handle(mouseOver: MouseEvent) {
    if (!this._shouldRespondToMouseOverDecider.decide()) {
      return;
    }

    let draggedOverBases = this._draggedOverBasesGetter.getFor(mouseOver);

    this._basesSelector.addToSelected(draggedOverBases);
  }
}
