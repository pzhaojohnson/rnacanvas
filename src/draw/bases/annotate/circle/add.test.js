import {
  addCircleOutline,
  addCircleHighlighting,
  removeCircleOutline,
  removeCircleHighlighting,
} from './add';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { Base } from 'Draw/bases/Base';

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

describe('addCircleOutline function', () => {
  it('adds outline and positions circle', () => {
    base.recenter({ x: 178.5, y: 359 });
    expect(base.outline).toBe(undefined);
    addCircleOutline(base);
    expect(base.outline).toBeTruthy(); // added outline
    let o = base.outline;
    // positioned circle
    expect(o.circle.attr('cx')).toBeCloseTo(178.5);
    expect(o.circle.attr('cy')).toBeCloseTo(359);
  });

  it('removes previous outline if present', () => {
    addCircleOutline(base);
    let o1 = base.outline;
    expect(wasRemoved(o1)).toBeFalsy();
    addCircleOutline(base);
    expect(wasRemoved(o1)).toBeTruthy(); // removed previous outline
    expect(base.outline.circle.attr('id')).not.toEqual(o1.circle.attr('id')); // added new outline
    // double-check that IDs are defined
    expect(o1.circle.attr('id')).toBeTruthy();
    expect(base.outline.circle.attr('id')).toBeTruthy();
  });
});

describe('addCircleHighlighting function', () => {
  it('adds highlighting and positions circle', () => {
    base.recenter({ x: 802, y: 1012.12 });
    expect(base.highlighting).toBe(undefined);
    addCircleHighlighting(base);
    expect(base.highlighting).toBeTruthy(); // added highlighting
    let h = base.highlighting;
    // positioned circle
    expect(h.circle.attr('cx')).toBeCloseTo(802);
    expect(h.circle.attr('cy')).toBeCloseTo(1012.12);
  });

  it('removes previous highlighting if present', () => {
    addCircleHighlighting(base);
    let h1 = base.highlighting;
    expect(wasRemoved(h1)).toBeFalsy();
    addCircleHighlighting(base);
    expect(wasRemoved(h1)).toBeTruthy(); // removed previous highlighting
    expect(base.highlighting.circle.attr('id')).not.toEqual(h1.circle.attr('id')); // added new highlighting
    // double-check that IDs are defined
    expect(h1.circle.attr('id')).toBeTruthy();
    expect(base.highlighting.circle.attr('id')).toBeTruthy();
  });
});

describe('removeCircleOutline function', () => {
  it('removes outline itself and reference', () => {
    addCircleOutline(base);
    let cba = base.outline;
    expect(wasRemoved(cba)).toBeFalsy();
    removeCircleOutline(base);
    expect(wasRemoved(cba)).toBeTruthy(); // removed outline itself
    expect(base.outline).toBe(undefined); // removed reference
  });

  it('handles a base with no outline', () => {
    expect(base.outline).toBe(undefined);
    expect(
      () => removeCircleOutline(base)
    ).not.toThrow();
  });
});

describe('removeCircleHighlighting function', () => {
  it('removes highlighting itself and reference', () => {
    addCircleHighlighting(base);
    let cba = base.highlighting;
    expect(wasRemoved(cba)).toBeFalsy();
    removeCircleHighlighting(base);
    expect(wasRemoved(cba)).toBeTruthy(); // removed highlighting itself
    expect(base.highlighting).toBe(undefined); // removed reference
  });

  it('handles a base with no highlighting', () => {
    expect(base.highlighting).toBe(undefined);
    expect(
      () => removeCircleHighlighting(base)
    ).not.toThrow();
  });
});
