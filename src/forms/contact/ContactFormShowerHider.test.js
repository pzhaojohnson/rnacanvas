import { ContactFormShowerHider } from './ContactFormShowerHider';

let positionedContactForm = null;

let closeButtonClickListener = null;

let closeButton = null;

let contactFormShowerHider = null;

beforeEach(() => {
  positionedContactForm = document.createElement('div');
  positionedContactForm.textContent = 'Contact form';

  closeButton = {
    addEventListener: (name, listener) => {
      if (name === 'click') {
        closeButtonClickListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };

  contactFormShowerHider = new ContactFormShowerHider({
    positionedContactForm, closeButton,
  });
});

afterEach(() => {
  contactFormShowerHider = null;

  closeButton = null;

  positionedContactForm = null;
});

describe('ContactFormShowerHider class', () => {
  describe('show method', () => {
    it('appends the contact form to the document body', () => {
      // add some elements to append after
      document.body.appendChild(document.createElement('div'));
      document.body.appendChild(document.createElement('div'));
      document.body.appendChild(document.createElement('div'));
      document.body.appendChild(document.createElement('div'));

      let n = document.body.childNodes.length;
      expect(n).toBeGreaterThanOrEqual(4);

      contactFormShowerHider.show();

      expect(document.body.childNodes.length).toBe(n + 1);

      expect(document.body.childNodes[n]).toBe(positionedContactForm);
      expect(positionedContactForm).toBeTruthy();
    });
  });

  it('removes the contact form from the document on close button click', () => {
    contactFormShowerHider.show();

    let n = document.body.childNodes.length;

    expect(document.body.childNodes[n - 1]).toBe(positionedContactForm);
    expect(positionedContactForm).toBeTruthy();

    closeButtonClickListener();

    expect(document.body.childNodes.length).toBe(n - 1);
    expect(document.body.childNodes[n - 2]).not.toBe(positionedContactForm);
  });
});
