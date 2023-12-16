export type Config = {
  targetApp: {
    /**
     * Represents the user's interaction with the drawing of the app.
     */
    drawingInteraction: {
      editingTool: {
        /**
         * Opens the editing form of the editing tool.
         */
        renderForm: () => void;
      }
    }
  }
};

/**
 * The task of opening the editing form of the editing tool for a target app.
 */
export class OpenTheEditingForm {
  constructor(private config: Config) {}

  do(): void {
    this.config.targetApp.drawingInteraction.editingTool.renderForm();
  }
}
