import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';

import { App } from 'App';
import { NodeSVG } from 'Draw/svg/NodeSVG';

import { AskBeforeLeavingToggle } from './AskBeforeLeavingToggle';

let app = null;

let container = null;

beforeEach(() => {
  app = new App({ SVG: { SVG: NodeSVG } });
  app.appendTo(document.body);

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  app.remove();
  app = null;

  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('AskBeforeLeavingToggle component', () => {
  test('when the askBeforeLeaving setting is true', () => {
    app.settings.askBeforeLeaving = true;
    act(() => {
      render(<AskBeforeLeavingToggle app={app} />, container);
    });
    expect(container.firstChild.className).toMatch(/on/);
    expect(container.firstChild.className).not.toMatch(/off/);
    Simulate.click(container.firstChild);
    expect(app.settings.askBeforeLeaving).toBe(false); // toggled
  });

  test('when the askBeforeLeaving setting is false', () => {
    app.settings.askBeforeLeaving = false;
    act(() => {
      render(<AskBeforeLeavingToggle app={app} />, container);
    });
    expect(container.firstChild.className).not.toMatch(/on/);
    expect(container.firstChild.className).toMatch(/off/);
    Simulate.click(container.firstChild);
    expect(app.settings.askBeforeLeaving).toBe(true); // toggled
  });

  test('when the askBeforeLeaving setting is undefined', () => {
    app.settings.askBeforeLeaving = undefined;
    act(() => {
      render(<AskBeforeLeavingToggle app={app} />, container);
    });
    expect(container.firstChild.className).not.toMatch(/on/);
    expect(container.firstChild.className).toMatch(/off/);
    Simulate.click(container.firstChild);
    expect(app.settings.askBeforeLeaving).toBe(true); // turned on
  });
});
