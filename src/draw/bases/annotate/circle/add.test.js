import {
  addOutline,
  addHighlighting,
  removeOutline,
  removeHighlighting,
} from './add';
import { NodeSVG } from 'Draw/NodeSVG';
import Base from 'Draw/Base';

function wasRemoved(cba) {
  return cba.circle.root() ? false : true;
}

let container = null;
let svg = null;
let base = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  svg = NodeSVG();
  svg.addTo(container);

  base = Base.create(svg, 'A', 50, 200);
});

afterEach(() => {
  base = null;

  svg.clear();
  svg.remove();
  svg = null;

  container.remove();
  container = null;
});

describe('addOutline function', () => {
  it('adds outline and positions circle', () => {
    base.moveTo(178.5, 359);
    expect(base.outline).toBe(undefined);
    addOutline(base);
    expect(base.outline).toBeTruthy(); // added outline
    let o = base.outline;
    // positioned circle
    expect(o.circle.attr('cx')).toBeCloseTo(178.5);
    expect(o.circle.attr('cy')).toBeCloseTo(359);
  });

  it('removes previous outline if present', () => {
    addOutline(base);
    let o1 = base.outline;
    expect(wasRemoved(o1)).toBeFalsy();
    addOutline(base);
    expect(wasRemoved(o1)).toBeTruthy(); // removed previous outline
    expect(base.outline.id).not.toEqual(o1.id); // added new outline
    // double-check that IDs are defined
    expect(o1.id).toBeTruthy();
    expect(base.outline.id).toBeTruthy();
  });
});

describe('addHighlighting function', () => {
  it('adds highlighting and positions circle', () => {
    base.moveTo(802, 1012.12);
    expect(base.highlighting).toBe(undefined);
    addHighlighting(base);
    expect(base.highlighting).toBeTruthy(); // added highlighting
    let h = base.highlighting;
    // positioned circle
    expect(h.circle.attr('cx')).toBeCloseTo(802);
    expect(h.circle.attr('cy')).toBeCloseTo(1012.12);
  });

  it('removes previous highlighting if present', () => {
    addHighlighting(base);
    let h1 = base.highlighting;
    expect(wasRemoved(h1)).toBeFalsy();
    addHighlighting(base);
    expect(wasRemoved(h1)).toBeTruthy(); // removed previous highlighting
    expect(base.highlighting.id).not.toEqual(h1.id); // added new highlighting
    // double-check that IDs are defined
    expect(h1.id).toBeTruthy();
    expect(base.highlighting.id).toBeTruthy();
  });
});

describe('removeOutline function', () => {
  it('removes outline itself and reference', () => {
    addOutline(base);
    let cba = base.outline;
    expect(wasRemoved(cba)).toBeFalsy();
    removeOutline(base);
    expect(wasRemoved(cba)).toBeTruthy(); // removed outline itself
    expect(base.outline).toBe(undefined); // removed reference
  });

  it('handles a base with no outline', () => {
    expect(base.outline).toBe(undefined);
    expect(
      () => removeOutline(base)
    ).not.toThrow();
  });
});

describe('removeHighlighting function', () => {
  it('removes highlighting itself and reference', () => {
    addHighlighting(base);
    let cba = base.highlighting;
    expect(wasRemoved(cba)).toBeFalsy();
    removeHighlighting(base);
    expect(wasRemoved(cba)).toBeTruthy(); // removed highlighting itself
    expect(base.highlighting).toBe(undefined); // removed reference
  });

  it('handles a base with no highlighting', () => {
    expect(base.highlighting).toBe(undefined);
    expect(
      () => removeHighlighting(base)
    ).not.toThrow();
  });
});
