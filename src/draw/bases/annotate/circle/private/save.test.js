import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

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
