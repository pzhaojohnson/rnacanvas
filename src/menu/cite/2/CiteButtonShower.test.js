import { CiteButtonShower } from './CiteButtonShower';

let positionedCiteButton = null;

let citeButtonShower = null;

beforeEach(() => {
  positionedCiteButton = document.createElement('button');
  positionedCiteButton.textContent = '"Cite"';

  citeButtonShower = new CiteButtonShower({
    positionedCiteButton,
  });
});

afterEach(() => {
  citeButtonShower = null;

  positionedCiteButton.remove();
  positionedCiteButton = null;
});

describe('CiteButtonShower class', () => {
  describe('show method', () => {
    it('appends the cite button to the document body', () => {
      let n = document.body.childNodes.length;

      citeButtonShower.show();

      expect(document.body.childNodes.length).toBe(n + 1);

      expect(document.body.childNodes[n]).toBe(positionedCiteButton);
      expect(positionedCiteButton).toBeTruthy();
    });
  });
});
