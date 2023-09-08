import { BasesShiftingTool } from './BasesShiftingTool';

let mouseMoveListener = null;
let mouseUpListener = null;

let window = null;

let mouseMoveHandler = null;
let mouseUpHandler = null;

let basesShiftingTool = null;

beforeEach(() => {
  window = {
    addEventListener: (name, listener) => {
      if (name === 'mousemove') {
        mouseMoveListener = listener;
      } else if (name === 'mouseup') {
        mouseUpListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };

  mouseMoveHandler = {
    handle: () => {},
  };

  mouseUpHandler = {
    handle: () => {},
  };

  basesShiftingTool = new BasesShiftingTool({
    window,
    mouseMoveHandler,
    mouseUpHandler,
  });
});

afterEach(() => {
  basesShiftingTool = null;

  mouseUpHandler = null;
  mouseMoveHandler = null;

  window = null;

  mouseUpListener = null;
  mouseMoveListener = null;
});

describe('BasesShiftingTool class', () => {
  it('forwards mouse move events to the mouse move handler', () => {
    mouseMoveHandler.handle = jest.fn();

    expect(mouseMoveListener).toBeTruthy();
    mouseMoveListener('Mouse move - 2398urqiwefl289');

    expect(mouseMoveHandler.handle).toHaveBeenCalledTimes(1);
    expect(mouseMoveHandler.handle.mock.calls[0][0]).toBe('Mouse move - 2398urqiwefl289');
  });

  it('forwards mouse up events to the mouse up handler', () => {
    mouseUpHandler.handle = jest.fn();

    expect(mouseUpListener).toBeTruthy();
    mouseUpListener('Mouse up - 39842oiwjeqflad');

    expect(mouseUpHandler.handle).toHaveBeenCalledTimes(1);
    expect(mouseUpHandler.handle.mock.calls[0][0]).toBe('Mouse up - 39842oiwjeqflad');
  });
});
