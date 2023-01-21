import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { OpenDrawingForm } from './OpenDrawingForm';

let app = null;

let container = null;

beforeEach(() => {
  app = new App({ SVG });
  app.appendTo(document.body);

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  app.remove();
  app = null;
});

describe('OpenDrawingForm component', () => {
  it('renders', () => {
    let props = {
      app,
      close: jest.fn(),
    };

    render(<OpenDrawingForm {...props} />, container);
  });
});
