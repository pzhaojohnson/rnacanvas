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

  drawingWrapper = new DrawingWrapper(drawing);
  strictDrawingWrapper = new DrawingWrapper(strictDrawing);
});

afterEach(() => {
  drawingWrapper = null;
  strictDrawingWrapper = null;

  drawing = null;
  strictDrawing = null;
});

describe('DrawingWrapper class', () => {
  test('wrappedDrawing property', () => {
    expect(drawingWrapper.wrappedDrawing).toBe(drawing);
    expect(strictDrawingWrapper.wrappedDrawing).toBe(strictDrawing);
  });
});
