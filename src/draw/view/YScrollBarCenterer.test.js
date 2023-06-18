import { YScrollBarCenterer } from './YScrollBarCenterer';

function createElementMock() {
  return {
    scrollTop: 0,
    scrollHeight: 0,
    getBoundingClientRect: () => ({
      height: 0,
    }),
  };
}

let yScrollBarCenterer = null;

let ele = null;

beforeEach(() => {
  yScrollBarCenterer = new YScrollBarCenterer();

  ele = createElementMock();
});

afterEach(() => {
  ele = null;

  yScrollBarCenterer = null;
});

describe('YScrollBarCenterer class', () => {
  describe('applyTo method', () => {
    test('when client height is less than scroll height', () => {
      ele.scrollTop = 89;
      ele.scrollHeight = 2192;
      ele.getBoundingClientRect = () => ({ height: 405 });

      yScrollBarCenterer.applyTo(ele);

      expect(ele.scrollTop).toBeCloseTo(893.5);
    });

    test('when client height equals scroll height', () => {
      ele.scrollTop = 88;
      ele.scrollHeight = 1560;
      ele.getBoundingClientRect = () => ({ height: 1560 });

      yScrollBarCenterer.applyTo(ele);

      expect(ele.scrollTop).toBeCloseTo(0);
    });

    test('when client height is greater than scroll height', () => {
      ele.scrollTop = 0;
      ele.scrollHeight = 500;
      ele.getBoundingClientRect = () => ({ height: 750 });

      yScrollBarCenterer.applyTo(ele);

      /**
       * Should get converted to zero automatically for an actual
       * element.
       */
      expect(ele.scrollTop).toBeCloseTo(-125);
    });
  });
});
