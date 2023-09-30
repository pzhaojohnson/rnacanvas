import { ContactFormFactory } from './ContactFormFactory';

let closeButton = null;

let contactFormFactory = null;

beforeEach(() => {
  closeButton = document.createElement('button');
  closeButton.textContent = 'Close';

  contactFormFactory = new ContactFormFactory({
    closeButton,
  });
});

afterEach(() => {
  contactFormFactory = null;

  closeButton = null;
});

describe('ContactFormFactory class', () => {
  describe('producePositioned method', () => {
    it('returns an HTML element', () => {
      let contactForm = contactFormFactory.producePositioned();
      expect(contactForm).toBeInstanceOf(HTMLElement);
    });

    it('includes close button in produced contact forms', () => {
      closeButton.textContent = 'Close - 298y43qiulfhif89148r3o';

      let contactForm = contactFormFactory.producePositioned();

      expect(contactForm.textContent).toMatch('Close - 298y43qiulfhif89148r3o');
    });
  });
});
