/**
 * A mouse event for example.
 */
export interface DragEvent {
  movementX: number;
  movementY: number;
}

export interface DragSignaller {
  /**
   * The added listener should be notified of all relevant drag
   * events.
   */
  addListener(listener: (event: DragEvent) => void): void;
}

export interface Vector {
  x: number;
  y: number;
}

export interface FormTranslater {
  /**
   * Translates the relevant form by the provided vector.
   */
  translate(vector: Vector): void;
}

export interface Config {
  dragSignaller: DragSignaller;

  formTranslater: FormTranslater;
}

/**
 * Uses the provided form translater to translate the target form
 * whenever there is a drag event on the target form (as indicated
 * by the provided drag signaller).
 */
export class DragTranslater {
  constructor(private config: Config) {
    config.dragSignaller.addListener(event => {
      config.formTranslater.translate({ x: event.movementX, y: event.movementY });
    });
  }
}
