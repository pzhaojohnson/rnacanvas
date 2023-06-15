import { BeforeLeavingHandler } from './BeforeLeavingHandler';

let shouldAskBeforeLeaving = null;

let event = null;

beforeEach(() => {
  shouldAskBeforeLeaving = {
    indicate: () => false,
  };

  event = {};
});

afterEach(() => {
  event = null;

  shouldAskBeforeLeaving = null;
});

describe('BeforeLeavingHandler class', () => {
  describe('handle method', () => {
    test('when indicated to ask before leaving', () => {
      shouldAskBeforeLeaving.indicate = () => true;

      let handler = new BeforeLeavingHandler({
        shouldAskBeforeLeaving,
        warningMessage: 'Warning: about to leave the app.',
      });

      expect(event.returnValue).toBeUndefined();

      let returnedValue = handler.handle(event);

      expect(returnedValue).toBe('Warning: about to leave the app.');
      expect(event.returnValue).toBe('Warning: about to leave the app.');
    });

    test('when indicated not to ask before leaving', () => {
      shouldAskBeforeLeaving.indicate = () => false;

      let handler = new BeforeLeavingHandler({
        shouldAskBeforeLeaving,
        warningMessage: 'A warning message.',
      });

      let returnedValue = handler.handle(event);

      expect(returnedValue).toBeUndefined();
      expect(event.returnValue).toBeUndefined();
    });
  });
});
