import { ContactButtonShower } from './ContactButtonShower';

let positionedContactButton = null;

let contactButtonShower = null;

beforeEach(() => {
  positionedContactButton = document.createElement('button');
  positionedContactButton.textContent = 'Contact';

  contactButtonShower = new ContactButtonShower({
    positionedContactButton,
  });
});

afterEach(() => {
  contactButtonShower = null;

  positionedContactButton.remove();
  positionedContactButton = null;
});

describe('ContactButtonShower class', () => {
  describe('show method', () => {
    it('appends the contact button to the document body', () => {
      let n = document.body.childNodes.length;

      contactButtonShower.show();

      expect(document.body.childNodes.length).toBe(n + 1);

      expect(document.body.childNodes[n]).toBe(positionedContactButton);
      expect(positionedContactButton).toBeTruthy();
    });
  });
});
