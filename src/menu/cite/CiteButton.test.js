import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { CiteButton } from './CiteButton';

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

describe('CiteButton component', () => {
  it('renders', () => {
    expect(() => {
      act(() => {
        render(<CiteButton />, container);
      });
    }).not.toThrow();
  });
});
