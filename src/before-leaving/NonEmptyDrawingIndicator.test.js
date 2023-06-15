import { NonEmptyDrawingIndicator } from './NonEmptyDrawingIndicator';

let app = null;

beforeEach(() => {
  app = {
    drawing: {
      isEmpty: () => false,
    },
  };
});

afterEach(() => {
  app = null;
});

describe('NonEmptyDrawingIndicator class', () => {
  describe('indicate method', () => {
    it('returns false when the drawing of the app is empty', () => {
      app.drawing.isEmpty = () => true;
      let indicator = new NonEmptyDrawingIndicator({ app });
      expect(indicator.indicate()).toBe(false);
    });

    it('returns true when the drawing of the app is nonempty', () => {
      app.drawing.isEmpty = () => false;
      let indicator = new NonEmptyDrawingIndicator({ app });
      expect(indicator.indicate()).toBe(true);
    });
  });
});
