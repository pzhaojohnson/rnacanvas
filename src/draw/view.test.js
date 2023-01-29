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
});
