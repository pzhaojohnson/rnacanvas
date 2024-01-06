import type { App } from 'App';

import { DrawingViewCentererBuilder } from 'Draw/view/DrawingViewCentererBuilder';

/**
 * The task of centering the user's view of the drawing of the target app.
 */
export class CenterTheViewOfTheDrawing {
  constructor(private config: { targetApp: App }) {}

  do(): void {
    let drawingViewCentererBuilder = new DrawingViewCentererBuilder();
    let drawingViewCenterer = drawingViewCentererBuilder.build();

    drawingViewCenterer.applyTo(this.config.targetApp.drawing);
  }
}
