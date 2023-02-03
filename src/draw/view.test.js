import { Drawing } from 'Draw/Drawing';

import { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as SVG from 'Draw/svg/NodeSVG';

import { DrawingWrapper } from './view';

let drawing = null;
let strictDrawing = null;

let drawingWrapper = null;
let strictDrawingWrapper = null;

beforeEach(() => {
  drawing = new Drawing({ SVG });
  strictDrawing = new StrictDrawing({ SVG });

  document.body.appendChild(drawing.node);
  document.body.appendChild(strictDrawing.node);

  drawingWrapper = new DrawingWrapper(drawing);
  strictDrawingWrapper = new DrawingWrapper(strictDrawing);
});

afterEach(() => {
  drawingWrapper = null;
  strictDrawingWrapper = null;

  drawing.node.remove();
  strictDrawing.node.remove();

  drawing = null;
  strictDrawing = null;
});

describe('DrawingWrapper class', () => {
  test('wrappedDrawing property', () => {
    expect(drawingWrapper.wrappedDrawing).toBe(drawing);
    expect(strictDrawingWrapper.wrappedDrawing).toBe(strictDrawing);
  });

  test('svg getter', () => {
    expect(drawingWrapper.svg).toBe(drawing.svg);
    expect(strictDrawingWrapper.svg).toBe(strictDrawing.svg);
  });

  test('svgContainer getter', () => {
    expect(drawingWrapper.svgContainer).toBe(drawing.svgContainer);
    expect(strictDrawingWrapper.svgContainer).toBe(strictDrawing.svgContainer);
  });

  test('centerPoint getter', () => {
    drawing.svg.viewbox(0, 0, 1250, 1100);
    expect(drawingWrapper.centerPoint.x).toBeCloseTo(625);
    expect(drawingWrapper.centerPoint.y).toBeCloseTo(550);

    strictDrawing.svg.viewbox(0, 0, 2035, 2568);
    expect(strictDrawingWrapper.centerPoint.x).toBeCloseTo(1017.5);
    expect(strictDrawingWrapper.centerPoint.y).toBeCloseTo(1284);
  });

  test('scrollLeft getter and setter', () => {
    drawingWrapper.scrollLeft = 812;
    expect(drawingWrapper.scrollLeft).toBe(812);

    strictDrawingWrapper.scrollLeft = 341;
    expect(strictDrawingWrapper.scrollLeft).toBe(341);
  });

  test('scrollTop getter and setter', () => {
    drawingWrapper.scrollTop = 108;
    expect(drawingWrapper.scrollTop).toBe(108);

    strictDrawingWrapper.scrollTop = 61;
    expect(strictDrawingWrapper.scrollTop).toBe(61);
  });

  test('viewWidth getter', () => {
    window.innerWidth = 1825;
    expect(drawingWrapper.viewWidth).toBe(1825);

    window.innerWidth = 2643
    expect(strictDrawingWrapper.viewWidth).toBe(2643);
  });

  test('viewHeight getter', () => {
    window.innerHeight = 897;
    expect(drawingWrapper.viewHeight).toBe(897);

    window.innerHeight = 1127;
    expect(strictDrawingWrapper.viewHeight).toBe(1127);
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

    test('a strict drawing', () => {
      strictDrawing.svg.viewbox(0, 0, 4000, 2500);

      window.innerWidth = 800;
      window.innerHeight = 650;

      let n = strictDrawing.svg.children().length;

      strictDrawingWrapper.centerView();

      // doesn't seem to work on Node.js
      expect(strictDrawingWrapper.scrollLeft).toBe(0);
      expect(strictDrawingWrapper.scrollTop).toBe(0);

      // SVG element used to center the view was removed
      expect(strictDrawing.svg.children().length).toBe(n);
    });
  });
});
