import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { Simulate } from 'react-dom/test-utils';

import { PreviousVersionsForm } from './PreviousVersionsForm';

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

describe('PreviousVersionsForm component', () => {
  it('passes goBack callback to back button', () => {
    let goBack = jest.fn();

    act(() => {
      render(<PreviousVersionsForm goBack={goBack} />, container);
    });

    // hard coded
    let previousVersionsForm = container.childNodes[0];
    let content = previousVersionsForm.childNodes[0];
    let backButton = content.childNodes[0];

    expect(goBack).not.toHaveBeenCalled();
    Simulate.click(backButton);
    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
