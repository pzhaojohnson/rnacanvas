export interface App {
  drawing: {
    isEmpty(): boolean;
  }

  canUndo(): boolean;

  canRedo(): boolean;
}

export class UserHasADrawingOpen {
  constructor(private config: { targetApp: App }) {}

  isTrue(): boolean {
    let drawingIsEmpty = this.config.targetApp.drawing.isEmpty();

    let drawingIsNotEmpty = !drawingIsEmpty;

    let canUndo = this.config.targetApp.canUndo();

    let canRedo = this.config.targetApp.canRedo();

    return (
      drawingIsNotEmpty
      || canUndo
      || canRedo
    );
  }
}
