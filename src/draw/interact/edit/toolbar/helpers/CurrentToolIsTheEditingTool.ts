import type { App } from 'App';

import { EditingTool } from './EditingTool';

import { CurrentTool } from './CurrentTool';

/**
 * Is true if the current tool of the target app is the editing tool.
 */
export class CurrentToolIsTheEditingTool {
  constructor(private config: { targetApp: App }) {}

  isTrue(): boolean {
    let targetApp = this.config.targetApp;

    let currentTool = (new CurrentTool({ targetApp })).get();

    let editingTool = (new EditingTool({ targetApp })).get();

    return currentTool == editingTool;
  }
}
