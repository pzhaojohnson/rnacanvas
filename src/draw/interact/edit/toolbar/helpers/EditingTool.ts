import type { App } from 'App';

/**
 * The editing tool of the target app.
 */
export class EditingTool {
  constructor(private config: { targetApp: App }) {}

  get() {
    return this.config.targetApp.drawingInteraction.editingTool;
  }
}
