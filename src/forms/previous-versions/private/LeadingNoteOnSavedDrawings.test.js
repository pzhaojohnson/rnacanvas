import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { LeadingNoteOnSavedDrawings } from './LeadingNoteOnSavedDrawings';

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

describe('LeadingNoteOnSavedDrawings component', () => {
  it('renders', () => {
    act(() => {
      render(<LeadingNoteOnSavedDrawings />, container);
    });
  });
});
