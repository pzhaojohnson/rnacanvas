import { UserHasADrawingOpen } from './UserHasADrawingOpen';

let targetApp = null;

let userHasADrawingOpen = null;

beforeEach(() => {
  targetApp = {
    drawing: {
      isEmpty: () => false,
    },
    canUndo: () => false,
    canRedo: () => false,
  };

  userHasADrawingOpen = new UserHasADrawingOpen({ targetApp });
});

afterEach(() => {
  userHasADrawingOpen = null;

  targetApp = null;
});

describe('UserHasADrawingOpen class', () => {
  describe('isTrue method', () => {
    it('returns true so long as the drawing is not empty', () => {
      targetApp.drawing.isEmpty = () => false;
      targetApp.canUndo = () => false;
      targetApp.canRedo = () => false;

      expect(userHasADrawingOpen.isTrue()).toBe(true);
    });

    it('returns true so long as can undo', () => {
      targetApp.drawing.isEmpty = () => true;
      targetApp.canUndo = () => true;
      targetApp.canRedo = () => false;

      expect(userHasADrawingOpen.isTrue()).toBe(true);
    });

    it('returns true so long as can redo', () => {
      targetApp.drawing.isEmpty = () => true;
      targetApp.canUndo = () => false;
      targetApp.canRedo = () => true;

      expect(userHasADrawingOpen.isTrue()).toBe(true);
    });

    it('returns false otherwise', () => {
      targetApp.drawing.isEmpty = () => true;
      targetApp.canUndo = () => false;
      targetApp.canRedo = () => false;

      expect(userHasADrawingOpen.isTrue()).toBe(false);
    });
  });
});
