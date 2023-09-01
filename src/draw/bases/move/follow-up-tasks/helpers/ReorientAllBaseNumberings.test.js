import { ReorientAllBaseNumberings } from './ReorientAllBaseNumberings';

describe('ReorientAllBaseNumberings class', () => {
  describe('do method', () => {
    it('calls the function to reorient all base numberings on the drawing', () => {
      let drawing = 'A drawing - 1987r3iewhs';
      let reorientAllBaseNumberingsFn = jest.fn();

      let reorientAllBaseNumberings = new ReorientAllBaseNumberings({
        drawing, reorientAllBaseNumberingsFn,
      });

      expect(reorientAllBaseNumberingsFn).not.toHaveBeenCalled();

      reorientAllBaseNumberings.do();

      expect(reorientAllBaseNumberingsFn).toHaveBeenCalledTimes(1);
      expect(reorientAllBaseNumberingsFn.mock.calls[0][0]).toBe('A drawing - 1987r3iewhs');
    });
  });
});
