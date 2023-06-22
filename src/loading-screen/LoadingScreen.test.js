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

  test('isBeingShown method', () => {
    expect(loadingScreen.isBeingShown()).toBe(false);

    loadingScreen.show();
    expect(loadingScreen.isBeingShown()).toBe(true);

    return loadingScreen.hide().then(() => {
      expect(loadingScreen.isBeingShown()).toBe(false);
    });
  });

  test('hide method when loading screen is not currently being shown', () => {
    expect(loadingScreen.isBeingShown()).toBe(false);

    let t = Date.now();
    let n = document.body.childNodes.length;

    return loadingScreen.hide().then(() => {
      // promise should have been resolved immediately
      expect(Date.now() - t).toBeLessThan(10);

      // unchanged
      expect(document.body.childNodes.length).toBe(n);
    });
  });
});
