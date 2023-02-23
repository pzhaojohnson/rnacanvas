import {
  savableState,
  addSavedCircleOutline,
  addSavedCircleHighlighting,
} from './save';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { Base } from 'Draw/bases/Base';
import { addCircleOutline, addCircleHighlighting } from './add';
import { uuidRegex } from 'Draw/svg/assignUuid';

function areSameElement(ele1, ele2) {
  return (
    ele1.id() // check that ID is truthy
    && ele1.id() == ele2.id()
    && ele1.svg() // check that SVG string is truthy
    && ele1.svg() == ele2.svg()
  );
}

let container = null;
let svg = null;

let base1 = null;
let base2 = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  svg = NodeSVG();
  svg.addTo(container);

  // have same character and positioning
  base1 = Base.create(svg, 'T', 22, 33);
  base2 = Base.create(svg, 'T', 22, 33);
});

afterEach(() => {
  base1 = null;
  base2 = null;

  svg.clear();
  svg.remove();
  svg = null;

  container.remove();
  container = null;
});

describe('savableState function', () => {
  it('returns savable state', () => {
    addCircleOutline(base1);
    let c = base1.outline.circle;
    let saved = savableState(base1.outline);
    expect(saved).toEqual({
      className: 'CircleBaseAnnotation',
      circleId: c.id(),
    });
    expect(c.id()).toBeTruthy();
    expect(c.id()).toMatch(uuidRegex);
  });

  it('returns savable states that can be converted to and from JSON', () => {
    addCircleHighlighting(base1);
    let saved1 = savableState(base1.highlighting);
    let string1 = JSON.stringify(saved1);
    let saved2 = JSON.parse(string1);
    expect(saved2).toEqual(saved1);
  });
});

describe('addSavedCircleOutline function', () => {
  it('adds outline and finds circle', () => {
    addCircleOutline(base1);
    let c1 = base1.outline.circle;
    let saved = savableState(base1.outline);
    expect(base2.outline).toBe(undefined);
    addSavedCircleOutline(base2, saved);
    expect(base2.outline).toBeTruthy(); // added outline
    let c2 = base2.outline.circle;
    expect(areSameElement(c1, c2)).toBeTruthy(); // found circle
  });

  it("throws if saved state isn't for a circle base annotation", () => {
    addCircleOutline(base1);
    let saved = savableState(base1.outline);
    saved.className = 'CrcleBaseAnnotation';
    expect(
      () => addSavedCircleOutline(base2, saved)
    ).toThrow();
  });

  it('throws if unable to retrieve root SVG element of base', () => {
    addCircleOutline(base1);
    let saved = savableState(base1.outline);
    expect(base2.text.root()).toBeTruthy();
    base2.text.remove();
    expect(base2.text.root()).toBeFalsy();
    expect(
      () => addSavedCircleOutline(base2, saved)
    ).toThrow();
  });

  it('throws if unable to find circle', () => {
    addCircleOutline(base1);
    let saved = savableState(base1.outline);
    base1.outline.circle.remove();
    expect(
      () => addSavedCircleOutline(base2, saved)
    ).toThrow();
  });

  it('throws if base already has an outline', () => {
    // it is preferrable not to remove the previous outline
    // since doing so could remove the circle of the saved
    // outline (e.g., if this function were called twice for
    // the same saved outline)
    addCircleOutline(base1);
    let saved1 = savableState(base1.outline);
    addCircleOutline(base2);
    expect(base2.outline).toBeTruthy();
    expect(
      () => addSavedCircleOutline(base2, saved1)
    ).toThrow();
  });
});

describe('addSavedCircleHighlighting function', () => {
  it('adds highlighting and finds circle', () => {
    addCircleHighlighting(base1);
    let c1 = base1.highlighting.circle;
    let saved = savableState(base1.highlighting);
    expect(base2.highlighting).toBe(undefined);
    addSavedCircleHighlighting(base2, saved);
    expect(base2.highlighting).toBeTruthy(); // added highlighting
    let c2 = base2.highlighting.circle;
    expect(areSameElement(c1, c2)).toBeTruthy(); // found circle
  });

  it("throws if saved state isn't for a circle base annotation", () => {
    addCircleHighlighting(base1);
    let saved = savableState(base1.highlighting);
    saved.className = 'CircleBaseAnnotationn';
    expect(
      () => addSavedCircleHighlighting(base2, saved)
    ).toThrow();
  });

  it('throws if unable to retrieve root SVG element of base', () => {
    addCircleHighlighting(base1);
    let saved = savableState(base1.highlighting);
    expect(base2.text.root()).toBeTruthy();
    base2.text.remove();
    expect(base2.text.root()).toBeFalsy();
    expect(
      () => addSavedCircleHighlighting(base2, saved)
    ).toThrow();
  });

  it('throws if unable to find circle', () => {
    addCircleHighlighting(base1);
    let saved = savableState(base1.highlighting);
    base1.highlighting.circle.remove();
    expect(
      () => addSavedCircleHighlighting(base2, saved)
    ).toThrow();
  });

  it('throws if base already has highlighting', () => {
    // it is preferrable not to remove the previous highlighting
    // since doing so could remove the circle of the saved
    // highlighting (e.g., if this function were called twice for
    // the same saved highlighting)
    addCircleHighlighting(base1);
    let saved1 = savableState(base1.highlighting);
    addCircleHighlighting(base2);
    expect(base2.highlighting).toBeTruthy();
    expect(
      () => addSavedCircleHighlighting(base2, saved1)
    ).toThrow();
  });
});
