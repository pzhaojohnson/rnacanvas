import { DrawingViewCenterer } from './DrawingViewCenterer';

function createDrawingMock() {
  return {
    svgContainer: {},
  };
}

describe('DrawingViewCenterer class', () => {
  test('applyTo method', () => {
    let xScrollBarCenterer = { applyTo: jest.fn() };
    let yScrollBarCenterer = { applyTo: jest.fn() };

    let drawingViewCenterer = new DrawingViewCenterer({
      xScrollBarCenterer,
      yScrollBarCenterer,
    });

    let drawing = createDrawingMock();

    expect(xScrollBarCenterer.applyTo).not.toHaveBeenCalled();
    expect(yScrollBarCenterer.applyTo).not.toHaveBeenCalled();

    drawingViewCenterer.applyTo(drawing);

    expect(xScrollBarCenterer.applyTo).toHaveBeenCalledTimes(1);
    expect(yScrollBarCenterer.applyTo).toHaveBeenCalledTimes(1);

    let svgContainer = drawing.svgContainer;
    expect(xScrollBarCenterer.applyTo.mock.calls[0][0]).toBe(svgContainer);
    expect(yScrollBarCenterer.applyTo.mock.calls[0][0]).toBe(svgContainer);

    // check that is not just undefined
    expect(svgContainer).toBeTruthy();
    expect(typeof svgContainer).toBe('object');
  });
});
