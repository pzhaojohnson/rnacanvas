import { DrawingOriginIsAnRNA2DSchema } from './DrawingOriginIsAnRNA2DSchema';

let app = null;

let drawingOriginChecker = null;

let drawingOriginIsAnRNA2DSchema = null;

beforeEach(() => {
  app = {
    drawing: 'A drawing',
  };

  drawingOriginChecker = {
    originIsAnRNA2DSchema: () => false,
  };

  drawingOriginIsAnRNA2DSchema = new DrawingOriginIsAnRNA2DSchema({
    app,
    drawingOriginChecker,
  });
});

afterEach(() => {
  drawingOriginIsAnRNA2DSchema = null;

  drawingOriginChecker = null;

  app = null;
});

describe('DrawingOriginIsAnRNA2DSchema class', () => {
  describe('isTrue method', () => {
    it('passes the drawing of the app to the drawing origin checker', () => {
      app.drawing = 'A drawing - 12894yr2wiah';

      drawingOriginChecker.originIsAnRNA2DSchema = jest.fn(() => false);

      drawingOriginIsAnRNA2DSchema.isTrue();

      expect(drawingOriginChecker.originIsAnRNA2DSchema).toHaveBeenCalledTimes(1);
      expect(drawingOriginChecker.originIsAnRNA2DSchema.mock.calls[0][0]).toBe('A drawing - 12894yr2wiah');
    });

    it('returns what the drawing origin checker returns', () => {
      drawingOriginChecker.originIsAnRNA2DSchema = () => true;
      expect(drawingOriginIsAnRNA2DSchema.isTrue()).toBe(true);

      drawingOriginChecker.originIsAnRNA2DSchema = () => false;
      expect(drawingOriginIsAnRNA2DSchema.isTrue()).toBe(false);
    });
  });
});
