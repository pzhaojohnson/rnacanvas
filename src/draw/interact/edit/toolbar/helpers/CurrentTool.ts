import type { App } from 'App';

/**
 * The current tool of the target app.
 */
export class CurrentTool {
  constructor(private config: { targetApp: App }) {}

  get() {
    return this.config.targetApp.drawingInteraction.currentTool;
  }
}
