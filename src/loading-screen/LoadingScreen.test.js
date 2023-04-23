import { pageIsFullyLoaded } from 'Utilities/pageIsFullyLoaded';

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

    it('hides the loading screen after 5 seconds at most', () => {
      document.readyState = 'loading';
      expect(pageIsFullyLoaded()).toBeFalsy();

      let returnedPromiseWasResolved = false;

      loadingScreen.hideOncePageHasFullyLoaded().then(() => {
        returnedPromiseWasResolved = true;
      });

      return new Promise(resolve => {
        setTimeout(() => {
          // has not hid the loading screen just yet
          expect(loadingScreen.node.parentNode).toBe(document.body);
          expect(returnedPromiseWasResolved).toBe(false);

          setTimeout(() => {
            // has hid the loading screen
            expect(loadingScreen.node.parentNode).toBe(null);
            expect(returnedPromiseWasResolved).toBe(true);

            // still is falsy
            expect(pageIsFullyLoaded()).toBeFalsy();

            resolve();
          }, 1000);
        }, 4990);
      });
    }, 10000);
  });
});
