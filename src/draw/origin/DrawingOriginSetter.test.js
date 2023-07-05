import { DrawingOriginSetter } from './DrawingOriginSetter';

describe('DrawingOriginSetter class', () => {
  test('setOriginToAnRNA2DSchema method', () => {
    let drawing = { origin: undefined };

    let originSetter = new DrawingOriginSetter();
    originSetter.setOriginToAnRNA2DSchema(drawing);

    expect(drawing.origin).toBe('rna-2d-schema');
  });
});
