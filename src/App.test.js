import * as SVG from 'Draw/svg/NodeSVG';
import { appendSequence } from 'Draw/sequences/add/sequence';

import { App } from './App';

let container = null;
let app = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  app = new App({ SVG });
  app.appendTo(container);
});

afterEach(() => {
  app.remove();
  app = null;

  container.remove();
  container = null;
});

describe('App class', () => {
  test('appendTo and remove methods', () => {
    let container = document.createElement('div');
    let siblings = [document.createElement('div'), document.createElement('div')];
    siblings.forEach(sibling => container.appendChild(sibling));
    expect(container.contains(app.node)).toBeFalsy();
    app.appendTo(container);
    expect(container.lastChild).toBe(app.node); // appended to end
    app.remove();
    expect(container.contains(app.node)).toBeFalsy(); // was removed
  });

  test('updateDocumentTitle method', () => {
    document.title = 'asdf'; // make sure title is not already RNAcanvas
    expect(app.drawing.isEmpty()).toBeTruthy();
    app.updateDocumentTitle();
    expect(document.title).toBe('RNAcanvas');
    appendSequence(app.strictDrawing.drawing, { id: '1123nm', characters: 'asdfQWER' });
    app.updateDocumentTitle();
    expect(document.title).toBe('1123nm');
  });

  test('`newTab()`', () => {
    window.open = jest.fn();

    var location = window.location;

    delete window.location;

    window.location = {
      ...location,
      href: 'https://rnacanvas.app',
    };

    expect(window.open).not.toHaveBeenCalled();

    app.newTab();

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open.mock.calls[0][0]).toBe('https://rnacanvas.app');
    expect(window.open.mock.calls[0][1]).toBe('_blank');

    // include a schema URL that should be omitted
    window.location = {
      ...location,
      href: 'https://rnacanvas.app?schema=https://r2dt.org&default_values=AES',
      search: '?schema=https://r2dt.org&default_values=AES',
    };

    app.newTab();

    // maintains default values
    expect(window.open).toHaveBeenCalledTimes(2);
    expect(window.open.mock.calls[1][0]).toBe('https://rnacanvas.app?default_values=AES');
    expect(window.open.mock.calls[1][1]).toBe('_blank');
  });
});
