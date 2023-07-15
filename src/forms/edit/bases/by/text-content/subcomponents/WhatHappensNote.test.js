import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { WhatHappensNote } from './WhatHappensNote';

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

describe('WhatHappensNote component', () => {
  it('renders', () => {
    expect(() => {
      act(() => {
        render(<WhatHappensNote />, container);
      });
    }).not.toThrow();
  });
});
