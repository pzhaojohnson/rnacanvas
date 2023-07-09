import { UndoStackPusher } from './UndoStackPusher';

let app = null;

let undoStackPusher = null;

beforeEach(() => {
  app = {
    pushUndo: () => {},
  };

  undoStackPusher = new UndoStackPusher({ app });
});

afterEach(() => {
  undoStackPusher = null;

  app = null;
});

describe('UndoStackPusher class', () => {
  describe('push method', () => {
    it('calls the pushUndo method of the app', () => {
      app.pushUndo = jest.fn();

      expect(app.pushUndo).not.toHaveBeenCalled();
      undoStackPusher.push();
      expect(app.pushUndo).toHaveBeenCalledTimes(1);
    });
  });
});
