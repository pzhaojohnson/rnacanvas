import { LoadingScreen } from './LoadingScreen';

Object.defineProperty(document, 'readyState', {
  value: 'loading',
  writable: true,
});

let loadingScreen = null;

beforeEach(() => {
  loadingScreen = new LoadingScreen();
});

afterEach(() => {
  loadingScreen = null;
});

describe('LoadingScreen component', () => {
  it('has a relatively high z-index', () => {
    // expected value is hard coded
    expect(loadingScreen.node.style.zIndex).toBe('10');
  });

  test('show and hide methods', () => {
    let n = document.body.childNodes.length;

    loadingScreen.show();
    expect(document.body.childNodes.length).toBe(n + 1);
    expect(document.body.childNodes[n]).toBe(loadingScreen.node);

    let hidePromise = loadingScreen.hide();

    // shows fade out overlay
    expect(document.body.childNodes.length).toBe(n + 2);
    expect(document.body.childNodes[n + 1].className).toBe('fadeOutOverlay');

    return hidePromise.then(() => {
      // removes loading screen and fade out overlay
      expect(document.body.childNodes.length).toBe(n);
      expect(loadingScreen.node.parentNode).toBe(null);
    });
  });

  describe('hideOncePageHasFullyLoaded method', () => {
    beforeEach(() => {
      let n = document.body.childNodes.length;

      loadingScreen.show();
      expect(document.body.childNodes.length).toBe(n + 1);
      expect(document.body.childNodes[n]).toBe(loadingScreen.node);
    });

    test('when called while the page is still loading', () => {
      document.readyState = 'loading';

      let promise = loadingScreen.hideOncePageHasFullyLoaded();

      // waits for document ready state to change before hiding
      expect(loadingScreen.node.parentNode).toBe(document.body);

      return new Promise(resolve => {
        // make much longer than fade out animation duration
        let delay = 3000;

        setTimeout(() => {
          document.readyState = 'complete';

          promise.then(() => {
            // hid the loading screen
            expect(loadingScreen.node.parentNode).toBe(null);

            resolve();
          });
        }, delay);
      });
    });

    test('when called after the page has fully loaded', () => {
      document.readyState = 'complete';

      return loadingScreen.hideOncePageHasFullyLoaded().then(() => {
        // hid the loading screen
        expect(loadingScreen.node.parentNode).toBe(null);
      });
    });
  });
});
