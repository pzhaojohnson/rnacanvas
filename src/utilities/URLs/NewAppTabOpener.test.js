import { NewAppTabOpener } from './NewAppTabOpener';

let newTabOpener = null;

let baseAppURLProvider = null;

let newAppTabOpener = null;

beforeEach(() => {
  newTabOpener = {
    open: jest.fn(),
  };

  baseAppURLProvider = {
    provide: () => '',
  };

  newAppTabOpener = new NewAppTabOpener({
    newTabOpener,
    baseAppURLProvider,
  });
});

afterEach(() => {
  newAppTabOpener = null;

  baseAppURLProvider = null;

  newTabOpener = null;
});

describe('NewAppTabOpener class', () => {
  describe('openANewTabOfTheApp method', () => {
    it('passes the base app URL to the new tab opener', () => {
      newTabOpener.open = jest.fn();
      baseAppURLProvider.provide = () => 'https://rnacanvas.s9238yhewfw8.app';

      newAppTabOpener.openANewTabOfTheApp();

      expect(newTabOpener.open).toHaveBeenCalledTimes(1);

      expect(newTabOpener.open.mock.calls[0][0]).toBe(
        'https://rnacanvas.s9238yhewfw8.app'
      );
    });
  });
});
