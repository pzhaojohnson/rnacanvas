export interface App<Base> {
  drawingInteraction: {
    /**
     * The editing tool of the app.
     */
    editingTool: {
      /**
       * Adds the given bases to the collection of selected elements.
       *
       * If some of the given bases were already selected, they
       * should remain selected.
       */
      addToSelected(bases: Base[]): void;
    }
  }
}

export type BasesSelectorCtorParams<Base> = {
  app: App<Base>;
};

export class BasesSelector<Base> {
  _app: App<Base>;

  constructor(args: BasesSelectorCtorParams<Base>) {
    this._app = args.app;
  }

  /**
   * Adds the given bases to the collection of selected elements (for
   * the editing tool of the app).
   *
   * Bases that were already selected will remain selected.
   *
   * Does nothing if the given array of bases is empty.
   */
  addToSelected(bases: Base[]) {
    if (bases.length == 0) {
      return;
    }

    this._app.drawingInteraction.editingTool.addToSelected(bases);
  }
}
