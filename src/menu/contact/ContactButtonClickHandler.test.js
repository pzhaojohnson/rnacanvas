import { ContactButtonClickHandler } from './ContactButtonClickHandler';

let contactButtonClickListener = null;

let contactButton = null;

let contactFormShower = null;

let contactButtonClickHandler = null;

beforeEach(() => {
  contactButton = {
    addEventListener: (name, listener) => {
      if (name === 'click') {
        contactButtonClickListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };

  contactFormShower = {
    show: () => {},
  };

  contactButtonClickHandler = new ContactButtonClickHandler({
    contactButton, contactFormShower,
  });
});

afterEach(() => {
  contactButtonClickHandler = null;

  contactFormShower = null;

  contactButton = null;

  contactButtonClickListener = null;
});

describe('ContactButtonClickHandler class', () => {
  it('shows the contact form on contact button clicks', () => {
    contactFormShower.show = jest.fn();

    expect(contactButtonClickListener).toBeTruthy();
    contactButtonClickListener();

    expect(contactFormShower.show).toHaveBeenCalledTimes(1);
  });
});
