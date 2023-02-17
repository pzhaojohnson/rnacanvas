import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { Circle as SVGCircle } from '@svgdotjs/svg.js';

import { CircleBaseOutlineDecorator } from './save';

let svg = null;

let circleBaseOutline = null;
let circleBaseOutlineDecorator = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline({
    circle: svg.circle(10),
  });

  circleBaseOutlineDecorator = (
    new CircleBaseOutlineDecorator(circleBaseOutline)
  );
});

afterEach(() => {
  circleBaseOutlineDecorator = null;
  circleBaseOutline = null;

  svg.remove();
  svg = null;
});

describe('CircleBaseOutlineDecorator class', () => {
  describe('fromSaved static method', () => {
    it('finds circle element', () => {
      // add extra elements to sift through
      svg.text('A');
      svg.circle(25).back();
      svg.circle(10);
      svg.rect(10, 20).back();
      svg.text('g');

      let saved = circleBaseOutlineDecorator.toSaved();

      let circleBaseOutline2 = (
        CircleBaseOutlineDecorator.fromSaved({ saved, parent: svg })
      );

      expect(circleBaseOutline2.circle).toBeInstanceOf(SVGCircle);
      expect(circleBaseOutline2.circle.attr('id')).toBe(saved.circleId);
      expect(circleBaseOutline2.circle.attr('id')).toBeTruthy();
    });

    test('missing circle ID', () => {
      let saved = circleBaseOutlineDecorator.toSaved();
      saved.circleId = undefined;

      expect(
        () => CircleBaseOutlineDecorator.fromSaved({ saved, parent: svg })
      ).toThrow();
    });

    test('empty circle ID', () => {
      let saved = circleBaseOutlineDecorator.toSaved();
      saved.circleId = '';

      expect(
        () => CircleBaseOutlineDecorator.fromSaved({ saved, parent: svg })
      ).toThrow();
    });

    test('missing circle element', () => {
      let saved = circleBaseOutlineDecorator.toSaved();
      circleBaseOutline.circle.remove();

      expect(
        () => CircleBaseOutlineDecorator.fromSaved({ saved, parent: svg })
      ).toThrow();
    });

    test('nonunique circle ID', () => {
      circleBaseOutline.circle.attr('id', 'asdf-12345');

      let circle2 = svg.circle(5);
      circle2.attr('id', 'asdf-12345');

      let saved = circleBaseOutlineDecorator.toSaved();

      // does not currently throw
      expect(
        () => CircleBaseOutlineDecorator.fromSaved({ saved, parent: svg })
      ).not.toThrow();
    });

    test('unexpected saved types', () => {
      [undefined, null, {}, 2, true, 'asdf'].forEach(saved => {
        expect(
          () => CircleBaseOutlineDecorator.fromSaved({ saved, parent: svg })
        ).toThrow();
      });
    });
  });

  describe('save method', () => {
    it('includes class name and circle ID', () => {
      circleBaseOutline.circle.attr('id', 'id-1274618abhc');
      let saved = circleBaseOutlineDecorator.toSaved();

      expect(saved).toStrictEqual({
        className: 'CircleBaseOutline',
        circleId: 'id-1274618abhc',
      });
    });

    test('JSON conversion', () => {
      circleBaseOutline.circle.attr('id', 'asdf-387-daijdsvaj-35');
      let saved = circleBaseOutlineDecorator.toSaved();
      let json = JSON.stringify(saved);

      expect(JSON.parse(json)).toStrictEqual({
        className: 'CircleBaseOutline',
        circleId: 'asdf-387-daijdsvaj-35',
      });
    });
  });
});
