import * as SVG from '@svgdotjs/svg.js';

import { BoxScaler } from './BoxScaler';

let boxScaler = null;

beforeEach(() => {
  boxScaler = new BoxScaler();
});

afterEach(() => {
  boxScaler = null;
});

describe('BoxScaler class', () => {
  describe('scaledBox method', () => {
    test('a scaling factor greater than one', () => {
      let box = new SVG.Box(80, 150, 30, 50);
      let factor = 4;

      let scaledBox = boxScaler.scaledBox({ box, factor });

      expect(scaledBox.cx).toBeCloseTo(95);
      expect(scaledBox.cy).toBeCloseTo(175);
      expect(scaledBox.width).toBeCloseTo(120);
      expect(scaledBox.height).toBeCloseTo(200);
    });

    test('a scaling factor less than one', () => {
      let box = new SVG.Box(1000, 650, 75, 225);
      let factor = 0.2;

      let scaledBox = boxScaler.scaledBox({ box, factor });

      expect(scaledBox.cx).toBeCloseTo(1037.5);
      expect(scaledBox.cy).toBeCloseTo(762.5);
      expect(scaledBox.width).toBeCloseTo(15);
      expect(scaledBox.height).toBeCloseTo(45);
    });

    test('a scaling factor of one', () => {
      let box = new SVG.Box(50, 90, 800, 250);
      let factor = 1;

      let scaledBox = boxScaler.scaledBox({ box, factor });

      expect(scaledBox.cx).toBeCloseTo(450);
      expect(scaledBox.cy).toBeCloseTo(215);
      expect(scaledBox.width).toBeCloseTo(800);
      expect(scaledBox.height).toBeCloseTo(250);
    });

    test('a box with zero width and zero height', () => {
      let box = new SVG.Box(128, 337, 0, 0);
      let factor = 2;

      let scaledBox = boxScaler.scaledBox({ box, factor });

      expect(scaledBox.cx).toBeCloseTo(128);
      expect(scaledBox.cy).toBeCloseTo(337);
      expect(scaledBox.width).toBe(0);
      expect(scaledBox.height).toBe(0);
    });
  });
});
