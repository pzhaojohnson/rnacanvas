import { PushUndoStack } from './PushUndoStack';

let undoStackPusher = null;

let pushUndoStack = null;

beforeEach(() => {
  undoStackPusher = {
    push: () => {},
  };

  pushUndoStack = new PushUndoStack({ undoStackPusher });
});

afterEach(() => {
  pushUndoStack = null;

  undoStackPusher = null;
});

describe('PushUndoStack class', () => {
  describe('do method', () => {
    it('calls the push method of the undo stack pusher', () => {
      undoStackPusher.push = jest.fn();
      pushUndoStack.do();
      expect(undoStackPusher.push).toHaveBeenCalledTimes(1);
    });
  });
});
