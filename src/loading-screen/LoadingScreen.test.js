import { LoadingScreen } from './LoadingScreen';

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

  test('show method', () => {
    let n = document.body.childNodes.length;

    loadingScreen.show();
    expect(document.body.childNodes.length).toBe(n + 1);
    expect(document.body.childNodes[n]).toBe(loadingScreen.node);
  });
});
