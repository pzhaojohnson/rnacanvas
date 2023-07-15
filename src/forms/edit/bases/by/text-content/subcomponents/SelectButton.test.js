import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Simulate } from 'react-dom/test-utils';

import { SelectButton } from './SelectButton';

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

describe('SelectButton component', () => {
  it('binds on click callback', () => {
    let onClick = jest.fn();

    act(() => { render(<SelectButton onClick={onClick} />, container); });

    expect(onClick).not.toHaveBeenCalled();

    Simulate.click(container.firstChild);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
