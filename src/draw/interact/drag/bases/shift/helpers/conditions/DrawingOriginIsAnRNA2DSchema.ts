export interface App<Drawing> {
  /**
   * The drawing of the app.
   */
  drawing: Drawing;
}

export interface DrawingOriginChecker<Drawing> {
  /**
   * Returns true if the drawing originates from an RNA 2D schema
   * and false otherwise.
   */
  originIsAnRNA2DSchema(drawing: Drawing): boolean;
}

export type DrawingOriginIsAnRNA2DSchemaCtorParams<Drawing> = {
  /**
   * A reference to the whole app.
   */
  app: App<Drawing>;

  /**
   * Used to check the origin of the drawing of the app.
   */
  drawingOriginChecker: DrawingOriginChecker<Drawing>;
};

export class DrawingOriginIsAnRNA2DSchema<Drawing> {
  _app: App<Drawing>;

  _drawingOriginChecker: DrawingOriginChecker<Drawing>;

  constructor(args: DrawingOriginIsAnRNA2DSchemaCtorParams<Drawing>) {
    this._app = args.app;

    this._drawingOriginChecker = args.drawingOriginChecker;
  }

  isTrue(): boolean {
    let drawing = this._app.drawing;

    return this._drawingOriginChecker.originIsAnRNA2DSchema(drawing);
  }
}
