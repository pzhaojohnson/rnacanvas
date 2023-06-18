import { DrawingViewCenterer } from './DrawingViewCenterer';
jest.mock('./DrawingViewCenterer');

import { DrawingViewCentererBuilder } from './DrawingViewCentererBuilder';

describe('DrawingViewCentererBuilder class', () => {
  test('build and setter methods', () => {
    let builder = new DrawingViewCentererBuilder();

    let xScrollBarCenterer = {};
    let yScrollBarCenterer = {};

    builder.xScrollBarCenterer(xScrollBarCenterer);
    builder.yScrollBarCenterer(yScrollBarCenterer);

    expect(DrawingViewCenterer).not.toHaveBeenCalled();

    let drawingViewCenterer = builder.build();

    expect(drawingViewCenterer).toBeInstanceOf(DrawingViewCenterer);

    expect(DrawingViewCenterer).toHaveBeenCalledTimes(1);

    let mock = DrawingViewCenterer.mock;
    expect(mock.calls[0][0].xScrollBarCenterer).toBe(xScrollBarCenterer);
    expect(mock.calls[0][0].yScrollBarCenterer).toBe(yScrollBarCenterer);

    // double-check are truthy and unique
    expect(xScrollBarCenterer).toBeTruthy();
    expect(yScrollBarCenterer).toBeTruthy();
    expect(xScrollBarCenterer).not.toBe(yScrollBarCenterer);
  });
});
