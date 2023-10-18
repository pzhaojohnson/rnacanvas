import { DrawingGetter } from './DrawingGetter';

describe('DrawingGetter class', () => {
  describe('get method', () => {
    it('returns the drawing of the target app instance', () => {
      let targetApp = { drawing: 'Drawing - 36187284912' };

      let drawingGetter = new DrawingGetter(targetApp);

      expect(drawingGetter.get()).toBe('Drawing - 36187284912');
    });
  });
});
