import type { App } from 'App';

import { EditingTool } from './EditingTool';

/**
 * The currently selected elements (for the editing tool of the target app).
 */
export class SelectedElements {
  constructor(private config: { targetApp: App }) {}

  get() {
    let targetApp = this.config.targetApp;

    let editingTool = (new EditingTool({ targetApp })).get();

    return editingTool.selected();
  }
}
