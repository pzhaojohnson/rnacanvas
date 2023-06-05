import { createBase } from 'Draw/bases/createBase';

import { createStraightBond } from './createStraightBond';

import { createStrungTriangle } from 'Draw/bonds/strung/create';

import { createStrungRectangle } from 'Draw/bonds/strung/create';

import * as SVG from 'Draw/svg/NodeSVG';

import { StraightBondDecorator } from './appendTo';

let decoratee = null;
let decorator = null;

/**
 * Strung elements that can be added to the straight bond.
 */
let strungElements = null;

let svg = null;

beforeEach(() => {
  let base1 = createBase('A');
  let base2 = createBase('C');

  base1.setCenter({ x: 50, y: 25 });
  base2.setCenter({ x: 100, y: 25 });

  decoratee = createStraightBond({ base1, base2 });
  decorator = new StraightBondDecorator(decoratee);

  let curve = {
    startPoint: base1.getCenter(),
    endPoint: base2.getCenter(),
  };

  let curveLength = 50;

  strungElements = [
    createStrungTriangle({ curve, curveLength }),
    createStrungRectangle({ curve, curveLength }),
    createStrungTriangle({ curve, curveLength }),
    createStrungRectangle({ curve, curveLength }),
  ];

  svg = SVG.SVG();
  svg.addTo(document.body);

  // add some elements to append after
  svg.text('A');
  svg.circle(45);
  svg.circle(54);
  svg.rect(10, 2);
});

afterEach(() => {
  svg.remove();
  svg = null;

  strungElements = null;

  decorator = null;
  decoratee = null;
});

describe('StraightBondDecorator class', () => {
  describe('constructor', () => {
    it('stores decoratee', () => {
      expect(decorator.decoratee).toBe(decoratee);
      expect(decoratee).toBeTruthy();
    });
  });

  describe('appendTo method', () => {
    it('appends line', () => {
      expect(decoratee.line.root()).toBeFalsy();

      let n = svg.children().length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendTo(svg);

      expect(svg.children()[n]).toBe(decoratee.line);
    });

    it('appends strung elements', () => {
      decoratee.strungElements.push(...strungElements);
      expect(decoratee.strungElements.length).toBeGreaterThanOrEqual(3);

      decoratee.strungElements.forEach(se => {
        expect(se.path.root()).toBeFalsy();
      });

      let n = svg.children().length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendTo(svg);

      decoratee.strungElements.forEach(se => {
        expect(se.path.root()).toBe(svg);
        expect(se.path.position()).toBeGreaterThanOrEqual(n);
      });
    });

    it('places strung elements on top of line', () => {
      decoratee.strungElements.push(...strungElements);
      expect(decoratee.strungElements.length).toBeGreaterThanOrEqual(3);

      expect(decoratee.line.root()).toBeFalsy();

      decoratee.strungElements.forEach(se => {
        expect(se.path.root()).toBeFalsy();
      });

      decorator.appendTo(svg);

      expect(decoratee.line.root()).toBe(svg);

      decoratee.strungElements.forEach(se => {
        expect(se.path.root()).toBe(svg);
        expect(se.path.position()).toBeGreaterThan(decoratee.line.position());
      });
    });
  });

  describe('remove method', () => {
    it('removes line', () => {
      decorator.appendTo(svg);
      expect(decoratee.line.root()).toBe(svg);

      decorator.remove();
      expect(decoratee.line.root()).toBeFalsy();
    });

    it('removes strung elements', () => {
      decoratee.strungElements.push(...strungElements);
      expect(decoratee.strungElements.length).toBeGreaterThanOrEqual(3);

      decorator.appendTo(svg);

      decoratee.strungElements.forEach(se => {
        expect(se.path.root()).toBe(svg);
      });

      decorator.remove();

      decoratee.strungElements.forEach(se => {
        expect(se.path.root()).toBeFalsy();
      });
    });

    test('when the straight bond has not been added to anything', () => {
      decoratee.strungElements.push(...strungElements);
      expect(decoratee.strungElements.length).toBeGreaterThanOrEqual(3);

      expect(decoratee.line.root()).toBeFalsy();

      decoratee.strungElements.forEach(se => {
        expect(se.path.root()).toBeFalsy();
      });

      expect(() => decorator.remove()).not.toThrow();
    });
  });
});
