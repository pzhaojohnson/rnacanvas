import type { App } from 'App';

import { SelectedElements } from './SelectedElements';

/**
 * Is true if there are elements currently selected (by the editing tool of the target app).
 */
export class ThereAreElementsSelected {
  constructor(private config: { targetApp: App }) {}

  isTrue(): boolean {
    let targetApp = this.config.targetApp;

    let selectedElements = (new SelectedElements({ targetApp })).get();

    return selectedElements.length > 0;
  }
}
