import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { Header } from './Header';

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

describe('Header component', () => {
  it('renders back button when provided', () => {
    let backButton = <p>Back button.</p>;

    act(() => {
      render(<Header backButton={backButton} />, container);
    });

    expect(container.firstChild.textContent.includes('Back button.'))
      .toBeTruthy();
  });

  it('can render with no back button', () => {
    expect(() => {
      act(() => {
        render(<Header />, container);
      });
    }).not.toThrow();

    expect(container.firstChild.textContent.includes('Back button.'))
      .toBeFalsy();
  });
});
