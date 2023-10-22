import { HideSignaller } from './HideSignaller';

describe('HideSignaller class', () => {
  it('calls all listeners on hide button clicks', () => {
    let hideButtonClickListener = null;

    let hideButton = {
      addEventListener: (name, listener) => {
        expect(name).toBe('click');
        hideButtonClickListener = listener;
      },
    };

    let hideSignaller = new HideSignaller({ hideButton });

    let hideSignalListeners = [jest.fn(), jest.fn(), jest.fn()];

    hideSignalListeners.forEach(listener => hideSignaller.addListener(listener));

    expect(hideSignalListeners[0]).not.toHaveBeenCalled();
    expect(hideSignalListeners[1]).not.toHaveBeenCalled();
    expect(hideSignalListeners[2]).not.toHaveBeenCalled();

    hideButtonClickListener();

    expect(hideSignalListeners[0]).toHaveBeenCalledTimes(1);
    expect(hideSignalListeners[1]).toHaveBeenCalledTimes(1);
    expect(hideSignalListeners[2]).toHaveBeenCalledTimes(1);
  });

  test('zero listeners', () => {
    let hideButtonClickListener = null;

    let hideButton = {
      addEventListener: (name, listener) => {
        expect(name).toBe('click');
        hideButtonClickListener = listener;
      },
    };

    new HideSignaller({ hideButton });

    expect(() => hideButtonClickListener()).not.toThrow();
  });
});
