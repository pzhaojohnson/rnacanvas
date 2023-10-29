import { DragSignaller } from './DragSignaller';

let mouseMoveListener = null;

let theWindowForTheWholeApp = null;

beforeEach(() => {
  theWindowForTheWholeApp = {
    addEventListener: (name, listener) => {
      if (name === 'mousemove') {
        mouseMoveListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };
});

afterEach(() => {
  theWindowForTheWholeApp = null;

  mouseMoveListener = null;
});

describe('DragSignaller class', () => {
  it('passes mouse move events to all listeners when the target node is grabbed', () => {
    let targetNodeIsGrabbed = { isTrue: () => true };

    let dragSignaller = new DragSignaller({ theWindowForTheWholeApp, targetNodeIsGrabbed });

    let listeners = [jest.fn(), jest.fn(), jest.fn()];

    listeners.forEach(listener => dragSignaller.addListener(listener));

    mouseMoveListener({ movementX: 8419.371, movementY: -3468.22 });

    listeners.forEach(listener => expect(listener).toHaveBeenCalledTimes(1));

    listeners.forEach(listener => expect(listener.mock.calls[0][0].movementX).toBe(8419.371));
    listeners.forEach(listener => expect(listener.mock.calls[0][0].movementY).toBe(-3468.22));
  });

  it('does not pass mouse move events to its listeners when the target node is not grabbed', () => {
    let targetNodeIsGrabbed = { isTrue: () => false };

    let dragSignaller = new DragSignaller({ theWindowForTheWholeApp, targetNodeIsGrabbed });

    let listeners = [jest.fn(), jest.fn(), jest.fn()];

    listeners.forEach(listener => dragSignaller.addListener(listener));

    mouseMoveListener({ movementX: 3, movementY: 5 });

    listeners.forEach(listener => expect(listener).not.toHaveBeenCalled());
  });

  test('zero listeners', () => {
    let targetNodeIsGrabbed = { isTrue: () => true };

    new DragSignaller({ theWindowForTheWholeApp, targetNodeIsGrabbed });

    expect(() => mouseMoveListener({ movementX: 1, movementY: 2 })).not.toThrow();
  });
});
