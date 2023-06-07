import { BasicDrawingFragment } from './private/BasicDrawingFragment';

import { DrawingFragment } from './DrawingFragment';

describe('DrawingFragment class', () => {
  describe('constructor', () => {
    it('initializes wrappee', () => {
      let drawingFragment = new DrawingFragment();
      expect(drawingFragment.wrappee).toBeInstanceOf(BasicDrawingFragment);
    });
  });
});
