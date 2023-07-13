import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { StringInputField } from './StringInputField';

let props = null;

let container = null;

beforeEach(() => {
  props = {
    stringInput: 'A string input element component.',
    label: '',
  };

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  props = null;
});

describe('StringInputField component', () => {
  it('renders with the provided string input element component', () => {
    props.stringInput = <p>component-983985efnjknskd89o</p>;

    act(() => { render(<StringInputField {...props} />, container); });

    expect(container.textContent).toMatch('component-983985efnjknskd89o');
  });

  it('renders with the provided label string', () => {
    props.label = '9824tiuhkwjbrg908u234';

    act(() => { render(<StringInputField {...props} />, container); });

    expect(container.textContent).toMatch('9824tiuhkwjbrg908u234');
  });

  it('renders with the provided style props', () => {
    props.style = { margin: '12px 2px 50px 139px' };

    act(() => { render(<StringInputField {...props} />, container); });

    expect(container.firstChild.style.margin).toBe('12px 2px 50px 139px');
  });
});
