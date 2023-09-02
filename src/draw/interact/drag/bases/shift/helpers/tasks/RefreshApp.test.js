import { RefreshApp } from './RefreshApp';

let appRefresher = null;

let refreshApp = null;

beforeEach(() => {
  appRefresher = {
    refresh: () => {},
  };

  refreshApp = new RefreshApp({ appRefresher });
});

afterEach(() => {
  refreshApp = null;

  appRefresher = null;
});

describe('RefreshApp class', () => {
  describe('do method', () => {
    it('calls the refresh method of the app refresher', () => {
      appRefresher.refresh = jest.fn();
      refreshApp.do();
      expect(appRefresher.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
