import { IsDraggableIndicator } from './IsDraggableIndicator';

let mouseOverListener = null;
let mouseOutListener = null;

let targetForm = null;

beforeEach(() => {
  targetForm = {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    },
    addEventListener: (name, listener) => {
      if (name === 'mouseover') {
        mouseOverListener = listener;
      } else if (name === 'mouseout') {
        mouseOutListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };
});

afterEach(() => {
  targetForm = null;

  mouseOverListener = null;
  mouseOutListener = null;
});


describe('IsDraggableIndicator class', () => {
  it('adds the provided CSS class name to the target form on direct mouse over', () => {
    new IsDraggableIndicator({ targetForm, draggableCSSClassName: 'oisdjfioweknjadv' });

    mouseOverListener({ target: targetForm });

    expect(targetForm.classList.add).toHaveBeenCalledTimes(1);
    expect(targetForm.classList.add.mock.calls[0][0]).toBe('oisdjfioweknjadv');
  });

  it('does nothing when a child node is moused over', () => {
    new IsDraggableIndicator({ targetForm, draggableCSSClassName: 'draggable' });

    mouseOverListener({ target: {} });

    expect(targetForm.classList.add).not.toHaveBeenCalled();
  });

  it('removes the provided CSS class name from the target form on direct mouse out', () => {
    new IsDraggableIndicator({ targetForm, draggableCSSClassName: 'cmnvhw3y938hfiud' });

    mouseOutListener({ target: targetForm });

    expect(targetForm.classList.remove).toHaveBeenCalledTimes(1);
    expect(targetForm.classList.remove.mock.calls[0][0]).toBe('cmnvhw3y938hfiud');
  });

  it('does nothing on mouse out from a child node', () => {
    new IsDraggableIndicator({ targetForm, draggableCSSClassName: 'cmnvhw3y938hfiud' });

    mouseOutListener({ target: {} });

    expect(targetForm.classList.remove).not.toHaveBeenCalled();
  });
});
