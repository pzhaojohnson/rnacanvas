import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { RNA2DSchemaOriginMessage } from './RNA2DSchemaOriginMessage';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('RNA2DSchemaOriginMessage component', () => {
  it('renders', () => {
    expect(() => {
      act(() => {
        render(<RNA2DSchemaOriginMessage />, container);
      });
    }).not.toThrow();
  });
});
