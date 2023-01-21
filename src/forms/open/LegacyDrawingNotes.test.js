import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { LegacyDrawingNotes } from './LegacyDrawingNotes';

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

describe('LegacyDrawingNotes component', () => {
  it('renders', () => {
    expect(
      () => render(<LegacyDrawingNotes />, container)
    ).not.toThrow();
  });
});
