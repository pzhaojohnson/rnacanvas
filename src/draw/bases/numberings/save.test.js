import { savableState, addSavedNumbering } from './save';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { Base } from 'Draw/bases/Base';
import { addNumbering } from './add';

function areSameElement(ele1, ele2) {
  return (
    ele1.id() // ID is truthy
    && ele1.id() == ele2.id()
    && ele1.svg() // SVG string is truthy
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
  base1 = Base.create(svg, 'G', 10, 50);
  base2 = Base.create(svg, 'G', 10, 50);
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
  it('returns correct values', () => {
    addNumbering(base1, 500);
    let textId = Math.random().toString();
    let lineId = Math.random().toString();
    base1.numbering.textPadding = 19.3814;
    base1.numbering.text.id(textId);
    base1.numbering.line.id(lineId);
    let state = savableState(base1.numbering);
    expect(state.className).toBe('BaseNumbering');
    expect(state.textId).toBe(textId);
    expect(state.lineId).toBe(lineId);
    expect(state.textPadding).toBeCloseTo(19.3814);
  });

  it('returned object can be converted to and from JSON', () => {
    addNumbering(base1, 1012);
    let state1 = savableState(base1.numbering);
    let string1 = JSON.stringify(state1);
    let state2 = JSON.parse(string1);
    expect(state2).toEqual(state1);
  });
});

describe('addSavedNumbering function', () => {
  it('finds text and line elements of saved numbering', () => {
    addNumbering(base1, 872);
    let bn1 = base1.numbering;
    let state = savableState(bn1);
    addSavedNumbering(base2, state);
    let bn2 = base2.numbering;
    expect(areSameElement(bn1.text, bn2.text)).toBeTruthy();
    expect(areSameElement(bn1.line, bn2.line)).toBeTruthy();
  });

  it('passes base center to newly created numbering', () => {
    addNumbering(base1, 480);
    base1.numbering.basePadding = 16.8;
    let state = savableState(base1.numbering);
    addSavedNumbering(base2, state);
    // requires that the base center was passed
    expect(base2.numbering.basePadding).toBeCloseTo(16.8);
  });

  it('applies saved text padding', () => {
    addNumbering(base1, 500);
    base1.numbering.textPadding = 18.7102;
    let state = savableState(base1.numbering);
    addSavedNumbering(base2, state);
    expect(base2.numbering.textPadding).toBeCloseTo(18.7102);
  });

  it('throws if saved state has wrong class name', () => {
    addNumbering(base1, 50);
    let state = savableState(base1.numbering);
    state.className = 'BaseNumbring';
    expect(
      () => addSavedNumbering(base2, state)
    ).toThrow();
  });

  it('throws if unable to retrieve root SVG element', () => {
    addNumbering(base1, 30);
    let state = savableState(base1.numbering);
    expect(base2.text.root()).toBeTruthy();
    base2.text.remove();
    expect(base2.text.root()).toBeFalsy();
    expect(
      () => addSavedNumbering(base2, state)
    ).toThrow();
  });

  it('throws if unable to find text element', () => {
    addNumbering(base1, 20);
    let state = savableState(base1.numbering);
    base1.numbering.text.remove();
    expect(
      () => addSavedNumbering(base2, state)
    ).toThrow();
  });

  it('throws if unable to find line element', () => {
    addNumbering(base1, 1);
    let state = savableState(base1.numbering);
    base1.numbering.line.remove();
    expect(
      () => addSavedNumbering(base2, state)
    ).toThrow();
  });

  it('throws if base is already numbered', () => {
    // would rather not remove numbering that a base already has
    // since doing so might remove the text and line elements of
    // the saved numbering (e.g., if this function was called twice
    // on the same base and for the same saved numbering)
    addNumbering(base1, 30);
    let state = savableState(base1.numbering);
    addNumbering(base2, 40);
    expect(
      () => addSavedNumbering(base2, state)
    ).toThrow();
  });
});
