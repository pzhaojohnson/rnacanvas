import * as SVG from '@svgdotjs/svg.js';

import { BoxPadder } from './BoxPadder';

let boxPadder = null;

beforeEach(() => {
  boxPadder = new BoxPadder();
});

afterEach(() => {
  boxPadder = null;
});

describe('BoxPadder class', () => {
  describe('paddedBox method', () => {
    test('positive padding', () => {
      let box = new SVG.Box(65, 100, 20, 40);
      let padding = 5;

      let paddedBox = boxPadder.paddedBox({ box, padding });

      expect(paddedBox.cx).toBeCloseTo(75);
      expect(paddedBox.cy).toBeCloseTo(120);
      expect(paddedBox.width).toBeCloseTo(30);
      expect(paddedBox.height).toBeCloseTo(50);
    });

    test('padding of zero', () => {
      let box = new SVG.Box(120, 180, 50, 12);
      let padding = 0;

      let paddedBox = boxPadder.paddedBox({ box, padding });

      expect(paddedBox.cx).toBeCloseTo(145);
      expect(paddedBox.cy).toBeCloseTo(186);
      expect(paddedBox.width).toBeCloseTo(50);
      expect(paddedBox.height).toBeCloseTo(12);
    });

    test('unpadded box has zero width and zero height', () => {
      let box = new SVG.Box(500, 350, 0, 0);
      let padding = 32;

      let paddedBox = boxPadder.paddedBox({ box, padding });

      expect(paddedBox.cx).toBeCloseTo(500);
      expect(paddedBox.cy).toBeCloseTo(350);
      expect(paddedBox.width).toBeCloseTo(64);
      expect(paddedBox.height).toBeCloseTo(64);
    });
  });
});
