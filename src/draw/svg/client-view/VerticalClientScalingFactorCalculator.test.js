import { VerticalClientScalingFactorCalculator } from './VerticalClientScalingFactorCalculator';

let calculator = null;

beforeEach(() => {
  calculator = new VerticalClientScalingFactorCalculator();
});

afterEach(() => {
  calculator = null;
});

describe('VerticalClientScalingFactorCalculator class', () => {
  describe('calculateFor method', () => {
    it('divides client height by untransformed SVG height', () => {
      let ele = {
        node: {
          getBBox: () => ({ height: 23 }),
          getBoundingClientRect: () => ({ height: 82 }),
        },
      };

      expect(calculator.calculateFor(ele)).toBeCloseTo(3.5652173913043477);
    });
  });

  test('untransformed SVG height is zero', () => {
    let ele = {
      node: {
        getBBox: () => ({ height: 0 }),
        getBoundingClientRect: () => ({ height: 15 }),
      },
    };

    expect(calculator.calculateFor(ele)).toBe(Infinity);
  });
});
