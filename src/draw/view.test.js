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
});
