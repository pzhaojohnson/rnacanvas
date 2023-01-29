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

  describe('centerOfView getter', () => {
    test('when the center of view is inside the drawing', () => {
      drawing.svg.viewbox(0, 0, 2012, 2784);

      // view is smaller than the drawing
      window.innerWidth = 1108;
      window.innerHeight = 872;

      drawingWrapper.scrollLeft = 119;
      drawingWrapper.scrollTop = 452;

      expect(drawingWrapper.centerOfView.x).toBeCloseTo(554 + 119);
      expect(drawingWrapper.centerOfView.y).toBeCloseTo(436 + 452);
    });

    test('when the center of view is outside the drawing', () => {
      drawing.svg.viewbox(0, 0, 200, 150);

      // view is bigger than the drawing
      window.innerWidth = 1215;
      window.innerHeight = 1450;

      // should always be zero when the view is bigger than the drawing
      drawingWrapper.scrollLeft = 0;
      drawingWrapper.scrollTop = 0;

      expect(drawingWrapper.centerOfView.x).toBeCloseTo(607.5);
      expect(drawingWrapper.centerOfView.y).toBeCloseTo(725);

      // in case are somehow nonzero
      drawingWrapper.scrollLeft = 18;
      drawingWrapper.scrollTop = 51;

      expect(drawingWrapper.centerOfView.x).toBeCloseTo(607.5 + 18);
      expect(drawingWrapper.centerOfView.y).toBeCloseTo(725 + 51);
    });

    test('a strict drawing', () => {
      strictDrawing.svg.viewbox(0, 0, 1500, 1250);

      // view is smaller than the drawing
      window.innerWidth = 900;
      window.innerHeight = 1000;

      strictDrawingWrapper.scrollLeft = 63;
      strictDrawingWrapper.scrollTop = 81;

      expect(strictDrawingWrapper.centerOfView.x).toBeCloseTo(450 + 63);
      expect(strictDrawingWrapper.centerOfView.y).toBeCloseTo(500 + 81);
    });
  });

  describe('centerOfView setter', () => {
    test('when the recentered view fits inside the drawing', () => {
      drawing.svg.viewbox(0, 0, 4500, 4243);

      window.innerWidth = 915;
      window.innerHeight = 874;

      drawingWrapper.centerOfView = { x: 2101, y: 3412 };

      expect(drawingWrapper.scrollLeft).toBeCloseTo(1643.5);
      expect(drawingWrapper.scrollTop).toBeCloseTo(2975);
    });

    test('trying to go too far to the right and down', () => {
      drawing.svg.viewbox(0, 0, 1910, 1892);

      window.innerWidth = 700;
      window.innerHeight = 800;

      drawingWrapper.centerOfView = { x: 1900, y: 1870 };

      // should remain zero in a web browser (but don't on Node.js)
      expect(drawingWrapper.scrollLeft).toBeCloseTo(1550);
      expect(drawingWrapper.scrollTop).toBeCloseTo(1470);
    });

    test('trying to go too far to the left and up', () => {
      drawing.svg.viewbox(0, 0, 2000, 1500);

      window.innerWidth = 400;
      window.innerHeight = 350;

      drawingWrapper.centerOfView = { x: 50, y: 75 };

      // should remain zero in a web browser (but don't on Node.js)
      expect(drawingWrapper.scrollLeft).toBeCloseTo(-150);
      expect(drawingWrapper.scrollTop).toBeCloseTo(-100);
    });

    test('when the view is bigger than the drawing', () => {
      drawing.svg.viewbox(0, 0, 525, 615);

      // bigger than the drawing
      window.innerWidth = 1910;
      window.innerHeight = 1892;

      drawingWrapper.centerOfView = { x: 1800, y: 1600 };

      // should remain zero in a web browser (but don't on Node.js)
      expect(drawingWrapper.scrollLeft).toBeCloseTo(845);
      expect(drawingWrapper.scrollTop).toBeCloseTo(654);
    });

    test('a strict drawing', () => {
      strictDrawing.svg.viewbox(0, 0, 3000, 2000);

      window.innerWidth = 600;
      window.innerHeight = 450;

      strictDrawingWrapper.centerOfView = { x: 2109, y: 1777 };

      expect(strictDrawingWrapper.scrollLeft).toBeCloseTo(1809);
      expect(strictDrawingWrapper.scrollTop).toBeCloseTo(1552);
    });
  });
});
