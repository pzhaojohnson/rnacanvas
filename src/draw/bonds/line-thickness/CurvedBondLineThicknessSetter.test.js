import { CurvedBondLineThicknessSetter } from './CurvedBondLineThicknessSetter';

describe('CurvedBondLineThicknessSetter class', () => {
  describe('set method', () => {
    it('sets the stroke width of the path element', () => {
      let setter = new CurvedBondLineThicknessSetter();

      let bond = { path: { attr: jest.fn() } };
      let lineThickness = 6.0383956191;

      setter.set({ bond, lineThickness });

      expect(bond.path.attr).toHaveBeenCalledTimes(1);
      expect(bond.path.attr.mock.calls[0][0]).toBe('stroke-width');
      expect(bond.path.attr.mock.calls[0][1]).toBe(6.0383956191);
    });
  });
});
