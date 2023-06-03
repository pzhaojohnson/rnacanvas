import { Base } from './Base';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { addCircleHighlighting, addCircleOutline } from 'Draw/bases/outlines/circle/add';
import { addNumbering } from 'Draw/bases/numberings/add';

import { CircleBaseOutline } from './outlines/circle/CircleBaseOutline';

import { createBaseNumbering } from './numberings/createBaseNumbering';

let svg = NodeSVG();

describe('Base class', () => {
  describe('create static method', () => {
    it('creates with character and center coordinates', () => {
      let b = Base.create(svg, 'r', 8, 77);
      expect(b.character).toBe('r');
      expect(b.xCenter).toBe(8);
      expect(b.yCenter).toBe(77);
    });
  });

  describe('constructor', () => {
    test('inputting a text element directly', () => {
      let text = svg.text('w');
      let base = new Base(text);
      expect(base.text).toBe(text); // stored the text element
    });

    test('inputting a text element wrapped in an arguments object', () => {
      let text = svg.text('w');
      let base = new Base({ text });
      expect(base.text).toBe(text); // stored the text element
    });

    test('providing a center point', () => {
      let text = svg.text('A');
      text.center(99, 1012);
      // different from the text element center point
      let center = { x: 54, y: 14 };
      let base = new Base({ text, center });
      expect(base.center().x).toBeCloseTo(54);
      expect(base.center().y).toBeCloseTo(14);
    });

    test('not providing a center point', () => {
      let text = svg.text('A');
      text.center(39, 102);
      let base = new Base({ text });
      // uses the text element center point as its own center point
      expect(base.center().x).toBeCloseTo(39);
      expect(base.center().y).toBeCloseTo(102);
    });

    it('initializes text element ID', () => {
      let t = svg.text(add => add.tspan('T'));
      expect(t.attr('id')).toBe(undefined);
      let b = new Base(t);
      expect(t.attr('id')).toBeTruthy();
    });

    it('does not overwrite preexisting text element IDs', () => {
      // it is important not to overwrite preexisting IDs when opening
      // a saved drawing since elements may use IDs to reference each other
      // and may depend on IDs remaining the same
      let text = svg.text('A');
      text.id('asdfQWERzzxx');
      let base = new Base(text);
      expect(text.id()).toBe('asdfQWERzzxx'); // was not changed
    });
  });

  it('id getter', () => {
    let t = svg.text(add => add.tspan('T'));
    let id = t.id('asdfqwer');
    let b = new Base(t);
    expect(b.id).toEqual('asdfqwer');
  });

  describe('character property', () => {
    it('setter only accepts a single character', () => {
      let b = Base.create(svg, 'k', 1, 2);
      expect(b.character).toBe('k');
      b.character = 'P';
      expect(b.character).toBe('P');
      b.character = ''; // no characters
      expect(b.character).toBe('P');
      b.character = 'mn'; // multiple characters
      expect(b.character).toBe('P');
    });

    it('setter maintains center coordinates', () => {
      let b = Base.create(svg, 'G', 22, 53);
      let cx = b.xCenter;
      let cy = b.yCenter;
      let w = b.text.bbox().width;
      b.character = 'i';
      // dimensions did change
      expect(b.text.bbox().width).not.toBeCloseTo(w);
      // but center was still maintained
      expect(b.text.cx()).toBeCloseTo(cx);
      expect(b.text.cy()).toBeCloseTo(cy);
    });
  });

  it('xCenter and yCenter getters', () => {
    let b = Base.create(svg, 'q', 55.8, 245);
    expect(b.xCenter).toBeCloseTo(55.8);
    expect(b.yCenter).toBeCloseTo(245);
  });

  describe('recenter method', () => {
    it('moves text', () => {
      let b = Base.create(svg, 'W', 55.2, 88.5);
      b.recenter({ x: 103.7, y: 222.6 });
      expect(b.text.cx()).toBeCloseTo(103.7);
      expect(b.text.cy()).toBeCloseTo(222.6);
    });

    /* By testing highlighting, outline and numbering separately,
    we test that the if clauses of the moveTo method work correctly. */

    it('can reposition highlighting', () => {
      // with no outline or numbering
      let b = Base.create(svg, 't', 1, 2);
      addCircleHighlighting(b);
      let h = b.highlighting;
      b.recenter({ x: 8, y: 9 });
      expect(h.circle.attr('cx')).toBeCloseTo(8);
      expect(h.circle.attr('cy')).toBeCloseTo(9);
    });

    it('can reposition outline', () => {
      // with no highlighting or numbering
      let b = Base.create(svg, 'e', 3, 8);
      addCircleOutline(b);
      let o = b.outline;
      b.recenter({ x: 55, y: 38 });
      expect(o.circle.attr('cx')).toBeCloseTo(55);
      expect(o.circle.attr('cy')).toBeCloseTo(38);
    });

    it('can reposition numbering', () => {
      // with no highlighting or outline
      let b = Base.create(svg, 'e', 1, 5);
      addNumbering(b, 112);
      let n = b.numbering;
      let bp = n.basePadding;
      b.recenter({ x: 20, y: 40 });
      // requires that base center coordinates were passed
      expect(n.basePadding).toBeCloseTo(bp);
    });
  });

  test('getCenter and setCenter methods', () => {
    let b = new Base({ text: svg.text('A') });
    b.setCenter({ x: 146.139877, y: 2376.235987 });
    expect(b.getCenter().x).toBeCloseTo(146.139877);
    expect(b.getCenter().y).toBeCloseTo(2376.235987);

    // also moved text
    expect(b.text.cx()).toBeCloseTo(146.139877);
    expect(b.text.cy()).toBeCloseTo(2376.235987);
  });

  test('outline getter and setter', () => {
    let b = new Base({ text: svg.text('U') });
    expect(b.outline).toBeUndefined();

    let cbo = new CircleBaseOutline();
    b.outline = cbo;
    expect(b.outline).toBe(cbo);

    b.outline = undefined;
    expect(b.outline).toBeUndefined();
  });

  test('numbering getter and setter', () => {
    let b = new Base({ text: svg.text('A') });
    expect(b.numbering).toBeUndefined();

    let bn = createBaseNumbering(22);
    b.numbering = bn;
    expect(b.numbering).toBe(bn);

    b.numbering = undefined;
    expect(b.numbering).toBeUndefined();
  });
});
