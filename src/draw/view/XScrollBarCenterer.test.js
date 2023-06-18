import { XScrollBarCenterer } from './XScrollBarCenterer';

function createElementMock() {
  return {
    scrollLeft: 0,
    scrollWidth: 0,
    getBoundingClientRect: () => ({
      width: 0,
    }),
  };
}

let xScrollBarCenterer = null;

let ele = null;

beforeEach(() => {
  xScrollBarCenterer = new XScrollBarCenterer();

  ele = createElementMock();
});

afterEach(() => {
  ele = null;

  xScrollBarCenterer = null;
});

describe('XScrollBarCenterer class', () => {
  describe('applyTo method', () => {
    test('when client width is less than scroll width', () => {
      ele.scrollLeft = 58;
      ele.scrollWidth = 3012;
      ele.getBoundingClientRect = () => ({ width: 256 });

      xScrollBarCenterer.applyTo(ele);

      expect(ele.scrollLeft).toBeCloseTo(1378);
    });

    test('when client width equals scroll width', () => {
      ele.scrollLeft = 700;
      ele.scrollWidth = 1200;
      ele.getBoundingClientRect = () => ({ width: 1200 });

      xScrollBarCenterer.applyTo(ele);

      expect(ele.scrollLeft).toBeCloseTo(0);
    });

    test('when client width is greater than scroll width', () => {
      ele.scrollLeft = 0;
      ele.scrollWidth = 781;
      ele.getBoundingClientRect = () => ({ width: 900 });

      xScrollBarCenterer.applyTo(ele);

      /**
       * Should get converted to zero automatically for an actual
       * element.
       */
      expect(ele.scrollLeft).toBeCloseTo(-59.5);
    });
  });
});
