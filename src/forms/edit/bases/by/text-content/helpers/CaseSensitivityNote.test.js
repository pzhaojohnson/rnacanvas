import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { CaseSensitivityNote } from './CaseSensitivityNote';

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

describe('CaseSensitivityNote component', () => {
  it('renders', () => {
    expect(() => {
      act(() => {
        render(<CaseSensitivityNote />, container);
      });
    }).not.toThrow();
  });
});
