import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { PreviousVersionsList } from './PreviousVersionsList';

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

describe('PreviousVersionsList component', () => {
  it('renders', () => {
    act(() => {
      render(<PreviousVersionsList />, container);
    });
  });
});
