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

    expect(container.firstChild.textContent).toBe('July 7, 2021 Release');
  });

  test('an invalid version ID', () => {
    expect(() => {
      act(() => {
        render(<VersionLink versionId='' />, container);
      });
    }).toThrow();
  });

  test('style prop', () => {
    let versionLink = (
      <VersionLink
        versionId='20221102t100547'
        style={{ marginRight: '269px', marginBottom: '318px' }}
      />
    );

    act(() => render(versionLink, container));

    expect(container.firstChild.style.marginRight).toBe('269px');
    expect(container.firstChild.style.marginBottom).toBe('318px');
  });
});
