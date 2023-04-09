import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { DottedVersionLink } from './DottedVersionLink';

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

describe('DottedVersionLink component', () => {
  it('passes props to the underlying version link', () => {
    act(() => {
      render(<DottedVersionLink versionId='20220326t180255' />, container);
    });

    let dottedVersionLink = container.firstChild;
    let versionLink = dottedVersionLink.childNodes[1];

    expect(versionLink.href).toBe(
      'https://20220326t180255-dot-rna2drawer2.uk.r.appspot.com/'
    );
  });
});
