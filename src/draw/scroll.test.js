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

  test('scrollTop getter', () => {
    drawing.svgContainer.scrollTop = 182;
    expect(drawingWrapper.scrollTop).toBe(182);

    strictDrawing.svgContainer.scrollTop = 449;
    expect(strictDrawingWrapper.scrollTop).toBe(449);
  });

  test('scrollTop setter', () => {
    drawingWrapper.scrollTop = 334;
    expect(drawingWrapper.scrollTop).toBe(334);

    strictDrawingWrapper.scrollTop = 512;
    expect(strictDrawingWrapper.scrollTop).toBe(512);
  });

  test('scrollWidth getter', () => {
    // seems easiest to mock the SVG container on Node.js
    let svgContainer = drawing.svgContainer;
    drawing.svgContainer = { scrollWidth: 5214 };
    expect(drawingWrapper.scrollWidth).toBe(5214);
    drawing.svgContainer = svgContainer; // restore

    svgContainer = strictDrawing.drawing.svgContainer;
    strictDrawing.drawing.svgContainer = { scrollWidth: 4908 };
    expect(strictDrawingWrapper.scrollWidth).toBe(4908);
    strictDrawing.drawing.svgContainer = svgContainer; // restore
  });

  test('scrollHeight getter', () => {
    // seems easiest to mock the SVG container on Node.js
    let svgContainer = drawing.svgContainer;
    drawing.svgContainer = { scrollHeight: 4032 };
    expect(drawingWrapper.scrollHeight).toBe(4032);
    drawing.svgContainer = svgContainer; // restore

    svgContainer = strictDrawing.drawing.svgContainer;
    strictDrawing.drawing.svgContainer = { scrollHeight: 3922 };
    expect(strictDrawingWrapper.scrollHeight).toBe(3922);
    strictDrawing.drawing.svgContainer = svgContainer; // restore
  });
});
