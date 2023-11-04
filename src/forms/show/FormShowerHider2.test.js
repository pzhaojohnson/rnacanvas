import { FormShowerHider2 } from './FormShowerHider2';

let show = null;
let hide = null;

let hideListener = null;

let formShowerHider = null;

beforeEach(() => {
  let hideSignaller = {
    addListener: listener => hideListener = listener,
  };

  show = { do: jest.fn() };
  hide = { do: jest.fn() };

  formShowerHider = new FormShowerHider2({ show, hide, hideSignaller });
});

afterEach(() => {
  formShowerHider = null;

  hideListener = null;

  show = null;
  hide = null;
});

describe('FormShowerHider2 class', () => {
  describe('show method', () => {
    it('does the show task', () => {
      expect(show.do).not.toHaveBeenCalled();

      formShowerHider.show();

      expect(show.do).toHaveBeenCalledTimes(1);
    });
  });

  it('does the hide task when the hide signal is given', () => {
    expect(hide.do).not.toHaveBeenCalled();

    expect(hideListener).toBeTruthy();
    hideListener();

    expect(hide.do).toHaveBeenCalledTimes(1);
  });
});
