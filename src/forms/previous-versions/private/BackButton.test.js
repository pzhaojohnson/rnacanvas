import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { Simulate } from 'react-dom/test-utils';

import { BackButton } from './BackButton';

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

describe('BackButton component', () => {
  it('calls onClick callback on click', () => {
    let onClick = jest.fn();

    act(() => {
      render(<BackButton onClick={onClick} />, container);
    });

    expect(onClick).not.toHaveBeenCalled();
    Simulate.click(container.firstChild);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does nothing on click when no onClick callback is specified', () => {
    act(() => {
      render(<BackButton />, container);
    });

    expect(() => Simulate.click(container.firstChild)).not.toThrow();
  });
});
