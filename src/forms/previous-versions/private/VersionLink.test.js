import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { VersionLink } from './VersionLink';

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

describe('VersionLink component', () => {
  test('a valid version ID', () => {
    act(() => {
      render(<VersionLink versionId='20210707t123025' />, container);
    });

    expect(container.firstChild.href).toBe(
      'https://20210707t123025-dot-rna2drawer2.uk.r.appspot.com/'
    );

    expect(container.firstChild.textContent).toBe('July 7, 2021');
  });

  test('an invalid version ID', () => {
    expect(() => {
      act(() => {
        render(<VersionLink versionId='' />, container);
      });
    }).toThrow();
  });
});
