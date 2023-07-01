import { NodeSVG } from 'Draw/svg/NodeSVG';
import { Base } from 'Draw/bases/Base';
import { addNumbering } from 'Draw/bases/numberings/add';

import { uuidRegex } from 'Draw/svg/assignUuid';

import { reposition } from 'Draw/bases/numberings/reposition';

import { round } from 'Math/round';
import { normalizeAngle } from 'Math/angles/normalizeAngle';

import { BaseNumbering } from './BaseNumbering';

let container = null;
let svg = null;
let base = null;
let numbering = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  svg = NodeSVG();
  svg.addTo(container);

  let text = svg.text('G');
  text.center(12, 15);
  base = new Base(text);

  addNumbering(base, 50);
  numbering = base.numbering;
});

afterEach(() => {
  numbering = null;
  base = null;

  svg.clear();
  svg.remove();
  svg = null;

  container.remove();
  container = null;
});

function getRoundedPositioning(bn) {
  return {
    line: {
      'x1': round(bn.line.attr('x1'), 3),
      'y1': round(bn.line.attr('y1'), 3),
      'x2': round(bn.line.attr('x2'), 3),
      'y2': round(bn.line.attr('y2'), 3),
    },
    text: {
      'x': round(bn.text.attr('x'), 3),
      'y': round(bn.text.attr('y'), 3),
      'text-anchor': bn.text.attr('text-anchor'),
    }
  };
}

describe('BaseNumbering class', () => {
  describe('constructor', () => {
    it('will initialize text and line element IDs with UUIDs', () => {
      [undefined, ''].forEach(v => {
        let t = svg.text('5');
        let l = svg.line(5, 15, 22, 300);
        t.attr({ 'id': v });
        l.attr({ 'id': v });
        // use the attr method to check the value of an ID
        // since the id method will itself initialize an ID
        expect(t.attr('id')).toBe(v);
        expect(l.attr('id')).toBe(v);
        let bn = new BaseNumbering(t, l, { x: 12, y: 24 });
        expect(t.attr('id')).toMatch(uuidRegex);
        expect(l.attr('id')).toMatch(uuidRegex);
      });
    });

    it('does not overwrite preexisting text and line element IDs', () => {
      // it is important not to overwrite IDs when opening a saved drawing
      // since elements may reference each other using saved IDs
      let t = svg.text('1');
      let l = svg.line(1, 5, 8, 12);
      t.attr({ 'id': 'textId1234' });
      l.attr({ 'id': 'lineId5678' });
      let bn = new BaseNumbering(t, l, { x: 1, y: 2 });
      expect(t.attr('id')).toBe('textId1234');
      expect(l.attr('id')).toBe('lineId5678');
    });
  });

  test('id getter', () => {
    let t = svg.text('6');
    let l = svg.line(10, 20, 30, 40);
    let bn = new BaseNumbering(t, l, { x: 10, y: 20 });
    expect(bn.id).toBe(t.id());
  });

  test('appendTo and remove methods', () => {
    let bn = numbering;
    bn.remove();

    expect(svg.children().includes(bn.text)).toBeFalsy();
    expect(svg.children().includes(bn.line)).toBeFalsy();

    bn.appendTo(svg);

    let n = svg.children().length;
    expect(svg.children()[n - 1]).toBe(bn.text);
    expect(svg.children()[n - 2]).toBe(bn.line);

    bn.remove();

    expect(svg.children().includes(bn.text)).toBeFalsy();
    expect(svg.children().includes(bn.line)).toBeFalsy();
  });

  test('basePadding, lineAngle and lineLength getters and setters', () => {
    numbering.reposition({ baseCenter: { x: 25.5, y: 256 } })
    // use setters
    numbering.basePadding = 18.07;
    numbering.lineAngle = 4.2;
    numbering.lineLength = 26.6;
    // check getters
    expect(numbering.basePadding).toBeCloseTo(18.07);
    expect(normalizeAngle(numbering.lineAngle, 0)).toBeCloseTo(4.2);
    expect(numbering.lineLength).toBeCloseTo(26.6);
    // check actual positioning
    let rp1 = getRoundedPositioning(numbering);
    reposition(numbering, {
      baseCenter: { x: 25.5, y: 256 },
      basePadding: 18.07,
      lineAngle: 4.2,
      lineLength: 26.6,
      textPadding: numbering.textPadding,
    });
    let rp2 = getRoundedPositioning(numbering);
    expect(rp1).toEqual(rp2);
  });

  describe('reposition method', () => {
    it('can be called with no arguments', () => {
      numbering.reposition({ baseCenter: { x: 520, y: 465 } });
      numbering.basePadding = 16.6;
      numbering.lineAngle = 2.8;
      numbering.lineLength = 18.25;
      numbering.reposition();
      let rp1 = getRoundedPositioning(numbering);
      reposition(numbering, {
        baseCenter: { x: 520, y: 465 },
        basePadding: 16.6,
        lineAngle: 2.8,
        lineLength: 18.25,
        textPadding: numbering.textPadding,
      });
      let rp2 = getRoundedPositioning(numbering);
      expect(rp1).toEqual(rp2);
    });

    it('can be called with arguments', () => {
      numbering.reposition({ baseCenter: { x: 12, y: 300 } });
      numbering.reposition({
        baseCenter: { x: 15, y: 1012 },
        basePadding: 25.2,
        lineAngle: 15.5,
        lineLength: 8.22,
        textPadding: 10.2,
      });
      let rp1 = getRoundedPositioning(numbering);
      reposition(numbering, {
        baseCenter: { x: 15, y: 1012 },
        basePadding: 25.2,
        lineAngle: 15.5,
        lineLength: 8.22,
        textPadding: 10.2,
      });
      let rp2 = getRoundedPositioning(numbering);
      expect(rp1).toEqual(rp2);
    });

    it('caches base center when provided', () => {
      numbering.reposition({ baseCenter: { x: 65, y: 19 } });
      numbering.reposition({ baseCenter: { x: 421, y: 328 } });
      numbering.reposition({ basePadding: 82 });
      let rp1 = getRoundedPositioning(numbering);
      reposition(numbering, {
        baseCenter: { x: 421, y: 328 },
        basePadding: 82,
        lineAngle: numbering.lineAngle,
        lineLength: numbering.lineLength,
        textPadding: numbering.textPadding,
      });
      let rp2 = getRoundedPositioning(numbering);
      expect(rp1).toEqual(rp2);
    });
  });
});
