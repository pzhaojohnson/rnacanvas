import type { App } from 'App';

import { Base } from 'Draw/bases/Base';

export interface SelectBasesByTextContentFormCloser {
  /**
   * Closes the select-bases-by-text-content form.
   */
  close(): void;
}

export type ConstructorArgs = {
  /**
   * The relevant app instance.
   */
  app: App;

  selectBasesByTextContentFormCloser: SelectBasesByTextContentFormCloser;
};

export class BasesSelector {
  readonly _app: App;

  readonly _selectBasesByTextContentFormCloser: (
    SelectBasesByTextContentFormCloser
  );

  constructor(args: ConstructorArgs) {
    let { app, selectBasesByTextContentFormCloser } = args;

    this._app = app;

    this._selectBasesByTextContentFormCloser = (
      selectBasesByTextContentFormCloser
    );
  }

  /**
   * Closes the select-bases-by-text-content form.
   *
   * Then switches to the editing tool.
   *
   * Then sets the editing tool to edit bases.
   *
   * Then sets the specified bases to be what is currently selected
   * by the editing tool.
   *
   * Then opens the editing tool form to edit the selected bases.
   */
  select(bases: Base[]) {
    this._selectBasesByTextContentFormCloser.close();

    let editingTool = this._app.drawingInteraction.editingTool;

    // switch to the editing tool
    this._app.drawingInteraction.currentTool = editingTool;

    // set the editing tool to edit bases
    editingTool.editingType = Base;

    editingTool.select(bases);

    // open form to edit the selected bases
    editingTool.renderForm();
  }
}
