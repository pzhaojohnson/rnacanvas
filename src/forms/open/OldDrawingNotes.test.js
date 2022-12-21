import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { OldDrawingNotes } from './OldDrawingNotes';

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

describe('OldDrawingNotes component', () => {
  it('renders', () => {
    expect(
      () => render(<OldDrawingNotes />, container)
    ).not.toThrow();
  });
});
