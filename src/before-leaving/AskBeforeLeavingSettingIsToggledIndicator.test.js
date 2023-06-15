import { AskBeforeLeavingSettingIsToggledIndicator } from './AskBeforeLeavingSettingIsToggledIndicator';

let app = null;

beforeEach(() => {
  app = {
    settings: {
      askBeforeLeaving: undefined,
    },
  };
});

afterEach(() => {
  app = null;
});

describe('AskBeforeLeavingSettingIsToggledIndicator class', () => {
  describe('indicate method', () => {
    test('when the ask before leaving setting is set to true', () => {
      app.settings.askBeforeLeaving = true;
      let indicator = new AskBeforeLeavingSettingIsToggledIndicator({ app });
      expect(indicator.indicate()).toBe(true);
    });

    test('when the ask before leaving setting is set to false', () => {
      app.settings.askBeforeLeaving = false;
      let indicator = new AskBeforeLeavingSettingIsToggledIndicator({ app });
      expect(indicator.indicate()).toBe(false);
    });

    test('when the ask before leaving setting is set to undefined', () => {
      app.settings.askBeforeLeaving = undefined;
      let indicator = new AskBeforeLeavingSettingIsToggledIndicator({ app });
      expect(indicator.indicate()).toBe(false);
    });
  });
});
