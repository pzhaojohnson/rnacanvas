import { Drawing } from 'Draw/Drawing';

import { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as SVG from 'Draw/svg/NodeSVG';

import * as Scroll from 'Draw/scroll';

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

  test('scrollLeft getter', () => {
    (new Scroll.DrawingWrapper(drawing)).scrollLeft = 812;
    expect(drawingWrapper.scrollLeft).toBe(812);

    (new Scroll.DrawingWrapper(strictDrawing)).scrollLeft = 341;
    expect(strictDrawingWrapper.scrollLeft).toBe(341);
  });

  test('scrollTop getter', () => {
    (new Scroll.DrawingWrapper(drawing)).scrollTop = 108;
    expect(drawingWrapper.scrollTop).toBe(108);

    (new Scroll.DrawingWrapper(strictDrawing)).scrollTop = 61;
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
});
