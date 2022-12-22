import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { DrawingFileInput } from './DrawingFileInput';

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

describe('DrawingFileInput component', () => {
  it('renders with onChange callback prop', () => {
    expect(
      () => render(<DrawingFileInput onChange={jest.fn()} />, container)
    ).not.toThrow();
  });

  it('renders without onChange callback prop', () => {
    expect(
      () => render(<DrawingFileInput />, container)
    ).not.toThrow();
  });
});
