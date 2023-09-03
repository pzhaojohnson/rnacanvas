import { BasesShiftingTool } from './BasesShiftingTool';

describe('BasesShiftingTool class', () => {
  describe('constructor', () => {
    it('forwards mouse up events to the mouse up handler', () => {
      let mouseUpListener = null;

      let window = {
        addEventListener: (name, listener) => {
          if (name === 'mouseup') {
            mouseUpListener = listener;
          }
        },
      };

      let mouseUpHandler = {
        handle: jest.fn(),
      };

      let basesShiftingTool = new BasesShiftingTool({
        window, mouseUpHandler,
      });

      expect(mouseUpListener).toBeTruthy();
      mouseUpListener('Mouse up - 2948riwae');

      expect(mouseUpHandler.handle).toHaveBeenCalledTimes(1);
      expect(mouseUpHandler.handle.mock.calls[0][0]).toBe('Mouse up - 2948riwae');
    });
  });
});
