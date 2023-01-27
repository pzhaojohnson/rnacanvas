import { Drawing } from 'Draw/Drawing';

import { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as SVG from 'Draw/svg/NodeSVG';

import { DrawingWrapper } from './centerPoint';

let drawing = null;
let drawingWrapper = null;

beforeEach(() => {
  drawing = new Drawing({ SVG });
  document.body.appendChild(drawing.node);

  drawingWrapper = new DrawingWrapper(drawing);
});

afterEach(() => {
  drawingWrapper = null;

  drawing.node.remove();
  drawing = null;
});

describe('DrawingWrapper class', () => {
  describe('centerPoint getter', () => {
    test('when X and Y of the view box are zero', () => {
      drawing.svg.viewbox(0, 0, 80, 66);

      expect(drawingWrapper.centerPoint.x).toBeCloseTo(40);
      expect(drawingWrapper.centerPoint.y).toBeCloseTo(33);
    });

    test('when X and Y of the view box are positive', () => {
      drawing.svg.viewbox(38, 112, 46, 82);

      expect(drawingWrapper.centerPoint.x).toBeCloseTo(61);
      expect(drawingWrapper.centerPoint.y).toBeCloseTo(153);
    });

    test('when X and Y of the view box are negative', () => {
      drawing.svg.viewbox(-100, -90, 22, 52);

      expect(drawingWrapper.centerPoint.x).toBeCloseTo(-89);
      expect(drawingWrapper.centerPoint.y).toBeCloseTo(-64);
    });

    test('a drawing of zero area', () => {
      drawing.svg.viewbox(0, 0, 0, 0);

      expect(drawingWrapper.centerPoint.x).toBe(0);
      expect(drawingWrapper.centerPoint.y).toBe(0);
    });

    test('a zoomed in drawing', () => {
      drawing.svg.attr('width', 100);
      drawing.svg.attr('height', 120);
      drawing.svg.viewbox(0, 0, 50, 60);

      // zoom should have no effect
      expect(drawingWrapper.centerPoint.x).toBeCloseTo(25);
      expect(drawingWrapper.centerPoint.y).toBeCloseTo(30);
    });

    test('a zoomed out drawing', () => {
      drawing.svg.attr('width', 10);
      drawing.svg.attr('height', 12);
      drawing.svg.viewbox(0, 0, 50, 60);

      // zoom should have no effect
      expect(drawingWrapper.centerPoint.x).toBeCloseTo(25);
      expect(drawingWrapper.centerPoint.y).toBeCloseTo(30);
    });

    test('a strict drawing', () => {
      let strictDrawing = new StrictDrawing({ SVG });
      document.body.appendChild(strictDrawing.node);

      strictDrawing.svg.viewbox(1017, 582, 450, 708);

      let drawingWrapper = new DrawingWrapper(strictDrawing);
      expect(drawingWrapper.centerPoint.x).toBeCloseTo(1242);
      expect(drawingWrapper.centerPoint.y).toBeCloseTo(936);

      strictDrawing.node.remove();
    });
  });
});
