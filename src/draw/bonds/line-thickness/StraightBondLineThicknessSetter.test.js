import { StraightBondLineThicknessSetter } from './StraightBondLineThicknessSetter';

describe('StraightBondLineThicknessSetter class', () => {
  describe('set method', () => {
    it('sets the stroke width of the line element', () => {
      let setter = new StraightBondLineThicknessSetter();

      let bond = { line: { attr: jest.fn() } };
      let lineThickness = 9.371781947381;

      setter.set({ bond, lineThickness });

      expect(bond.line.attr).toHaveBeenCalledTimes(1);
      expect(bond.line.attr.mock.calls[0][0]).toBe('stroke-width');
      expect(bond.line.attr.mock.calls[0][1]).toBe(9.371781947381);
    });
  });
});
