import { CiteButtonClickHandler } from './CiteButtonClickHandler';

let citeButtonClickListener = null;

let citeButton = null;

let citeFormShower = null;

let citeButtonClickHandler = null;

beforeEach(() => {
  citeButton = {
    addEventListener: (name, listener) => {
      if (name === 'click') {
        citeButtonClickListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };

  citeFormShower = {
    show: () => {},
  };

  citeButtonClickHandler = new CiteButtonClickHandler({
    citeButton, citeFormShower,
  });
});

afterEach(() => {
  citeButtonClickHandler = null;

  citeFormShower = null;

  citeButton = null;

  citeButtonClickListener = null;
});

describe('CiteButtonClickHandler class', () => {
  it('shows the cite form on cite button clicks', () => {
    citeFormShower.show = jest.fn();

    expect(citeButtonClickListener).toBeTruthy();
    citeButtonClickListener();

    expect(citeFormShower.show).toHaveBeenCalledTimes(1);
  });
});
