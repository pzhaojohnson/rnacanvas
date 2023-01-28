import { Drawing } from 'Draw/Drawing';

import { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as SVG from 'Draw/svg/NodeSVG';

import { DrawingWrapper } from './scroll';

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

  test('scrollLeft getter', () => {
    drawing.svgContainer.scrollLeft = 84;
    expect(drawingWrapper.scrollLeft).toBe(84);

    strictDrawing.svgContainer.scrollLeft = 1018;
    expect(strictDrawingWrapper.scrollLeft).toBe(1018);
  });

  test('scrollLeft setter', () => {
    drawingWrapper.scrollLeft = 223;
    expect(drawingWrapper.scrollLeft).toBe(223);

    strictDrawingWrapper.scrollLeft = 892;
    expect(strictDrawingWrapper.scrollLeft).toBe(892);
  });
});
