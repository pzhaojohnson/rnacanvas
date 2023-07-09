import { AppRefresher } from './AppRefresher';

let app = null;

let appRefresher = null;

beforeEach(() => {
  app = {
    refresh: () => {},
  };

  appRefresher = new AppRefresher({ app });
});

afterEach(() => {
  appRefresher = null;

  app = null;
});

describe('AppRefresher class', () => {
  describe('refresh method', () => {
    it('calls the refresh method of the app', () => {
      app.refresh = jest.fn();

      expect(app.refresh).not.toHaveBeenCalled();
      appRefresher.refresh();
      expect(app.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
