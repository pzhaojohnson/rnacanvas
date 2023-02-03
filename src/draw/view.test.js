import { Drawing } from 'Draw/Drawing';

import * as SVG from 'Draw/svg/NodeSVG';

import { DrawingWrapper } from './view';

let drawing = null;
let drawingWrapper = null;

beforeEach(() => {
  drawing = new Drawing({ SVG });
  drawingWrapper = new DrawingWrapper(drawing);

  document.body.appendChild(drawing.node);
});

afterEach(() => {
  drawing.node.remove();

  drawingWrapper = null;
  drawing = null;
});

describe('DrawingWrapper class', () => {
  test('wrappedDrawing property', () => {
    expect(drawingWrapper.wrappedDrawing).toBe(drawing);
  });

  test('svg getter', () => {
    expect(drawingWrapper.svg).toBe(drawing.svg);
  });

  test('svgContainer getter', () => {
    expect(drawingWrapper.svgContainer).toBe(drawing.svgContainer);
  });

  test('centerPoint getter', () => {
    drawing.svg.viewbox(0, 0, 1250, 1100);
    expect(drawingWrapper.centerPoint.x).toBeCloseTo(625);
    expect(drawingWrapper.centerPoint.y).toBeCloseTo(550);
  });

  test('scrollLeft getter and setter', () => {
    drawingWrapper.scrollLeft = 812;
    expect(drawingWrapper.scrollLeft).toBe(812);
  });

  test('scrollTop getter and setter', () => {
    drawingWrapper.scrollTop = 108;
    expect(drawingWrapper.scrollTop).toBe(108);
  });

  describe('centerView method', () => {
    test('when the view fits inside the drawing', () => {
      drawing.svg.viewbox(0, 0, 3382, 4189);

      window.innerWidth = 672;
      window.innerHeight = 623;

      let n = drawing.svg.children().length;

      drawingWrapper.centerView();

      // doesn't seem to work on Node.js
      expect(drawingWrapper.scrollLeft).toBe(0);
      expect(drawingWrapper.scrollTop).toBe(0);

      // SVG element used to center the view was removed
      expect(drawing.svg.children().length).toBe(n);
    });

    test('when the center of view cannot be inside the drawing', () => {
      drawing.svg.viewbox(0, 0, 200, 300);

      // more than twice the drawing dimensions
      window.innerWidth = 1000;
      window.innerHeight = 900;

      let n = drawing.svg.children().length;

      drawingWrapper.centerView();

      expect(drawingWrapper.scrollLeft).toBe(0);
      expect(drawingWrapper.scrollTop).toBe(0);

      // SVG element used to center the view was removed
      expect(drawing.svg.children().length).toBe(n);
    });
  });
});
