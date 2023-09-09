import { DragOverToSelectBasesTool } from './DragOverToSelectBasesTool';

let mouseOverListener = null;

let window = null;

let mouseOverHandler = null;

let dragOverToSelectBasesTool = null;

beforeEach(() => {
  window = {
    addEventListener: (name, listener) => {
      if (name === 'mouseover') {
        mouseOverListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };

  mouseOverHandler = {
    handle: () => {},
  };

  dragOverToSelectBasesTool = new DragOverToSelectBasesTool({
    window,
    mouseOverHandler,
  });
});

afterEach(() => {
  dragOverToSelectBasesTool = null;

  mouseOverHandler = null;

  window = null;

  mouseOverListener = null;
});

describe('DragOverToSelectBasesTool class', () => {
  it('forwards all mouse over events to the mouse over handler', () => {
    mouseOverHandler.handle = jest.fn();

    expect(mouseOverListener).toBeTruthy();
    mouseOverListener('Mouse over - 3289yr8yuhwaiofsl');

    expect(mouseOverHandler.handle).toHaveBeenCalledTimes(1);
    expect(mouseOverHandler.handle.mock.calls[0][0]).toBe('Mouse over - 3289yr8yuhwaiofsl');
  });
});
