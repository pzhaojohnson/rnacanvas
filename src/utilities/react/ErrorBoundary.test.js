import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';

import { ErrorBoundary } from './ErrorBoundary';

function BrokenComponent() {
  throw new Error('This component is broken.');

  return <p>Broken component.</p>;
}

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

describe('ErrorBoundary component', () => {
  it('renders children', () => {
    let fallback = <p>The fallback component.</p>;

    let errorBoundary = (
      <ErrorBoundary fallback={fallback} >
        <p>The children.</p>
      </ErrorBoundary>
    );

    act(() => render(errorBoundary, container));

    expect(container.textContent).toBe('The children.');
  });

  it('renders fallback when children break', () => {
    let fallback = <p>The fallback component.</p>;

    let errorBoundary = (
      <ErrorBoundary fallback={fallback} >
        <BrokenComponent />
      </ErrorBoundary>
    );

    act(() => render(errorBoundary, container));

    expect(container.textContent).toBe('The fallback component.');
  });

  it('renders nothing by default', () => {
    let errorBoundary = <ErrorBoundary />;

    act(() => render(errorBoundary, container));

    expect(container.firstChild).toBeNull();
  });

  it('ignores fallback when has no children', () => {
    let fallback = <p>A fallback.</p>;
    let errorBoundary = <ErrorBoundary fallback={fallback} />;

    act(() => render(errorBoundary, container));

    // rendered nothing
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing by default when children break', () => {
    let errorBoundary = (
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    act(() => render(errorBoundary, container));

    expect(container.firstChild).toBeNull();
  });
});
