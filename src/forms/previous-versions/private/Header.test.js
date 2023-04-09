import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { Header } from './Header';

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

describe('Header component', () => {
  it('renders', () => {
    expect(() => {
      act(() => {
        render(<Header />, container);
      });
    }).not.toThrow();
  });
});
