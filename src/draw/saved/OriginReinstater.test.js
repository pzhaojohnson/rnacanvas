import { OriginReinstater } from './OriginReinstater';

describe('OriginReinstater class', () => {
  describe('reinstateOrigin method', () => {
    it('reinstates an RNA 2D schema origin', () => {
      let drawing = { origin: undefined };
      let savedDrawing = { origin: 'rna-2d-schema' };

      let originReinstater = new OriginReinstater();
      originReinstater.reinstateOrigin({ drawing, savedDrawing });

      expect(drawing.origin).toBe('rna-2d-schema');
    });

    it('does nothing when the saved origin is undefined', () => {
      let drawing = { origin: 'An origin' };
      let savedDrawing = { origin: undefined };

      let originReinstater = new OriginReinstater();
      originReinstater.reinstateOrigin({ drawing, savedDrawing });

      // was not changed
      // (this behavior is not firm and might change in the future)
      expect(drawing.origin).toBe('An origin');
    });

    it('does not throw for non-object inputs', () => {
      let originReinstater = new OriginReinstater();
      let drawing = {};

      let nonObjectValues = [
        undefined,
        null,
        5,
        '',
        'asdf',
        false,
      ];

      nonObjectValues.forEach(savedDrawing => {
        expect(() => {
          originReinstater.reinstateOrigin({ drawing, savedDrawing })
        }).not.toThrow();
      });
    });
  });
});
