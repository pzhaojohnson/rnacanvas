import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import * as React from 'react';

import { render } from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

import { act } from 'react-dom/test-utils';
import { Simulate } from 'react-dom/test-utils';

import { ZoomInput } from './ZoomInput';

let app = null;

let container = null;

beforeEach(() => {
  app = new App({ SVG });
  app.appendTo(document.body);

  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  app.remove();
  app = null;
});

describe('ZoomInput component', () => {
  describe('displaying the zoom of the drawing', () => {
    test('when the zoom is 100%', () => {
      app.drawing.svg.attr('width', 504);
      app.drawing.svg.attr('height', 311);
      app.drawing.svg.viewbox(50, 60, 504, 311);

      act(() => render(<ZoomInput {...{ app }} />, container));
      expect(container.firstChild.value).toBe('100%');
    });

    test('when the zoom is above 100%', () => {
      app.drawing.svg.attr('width', 112);
      app.drawing.svg.attr('height', 39);
      app.drawing.svg.viewbox(0, 0, 59.259259, 20.634920);

      act(() => render(<ZoomInput {...{ app }} />, container));
      expect(container.firstChild.value).toBe('189%');
    });

    test('when the zoom is below 100%', () => {
      app.drawing.svg.attr('width', 30);
      app.drawing.svg.attr('height', 50);
      app.drawing.svg.viewbox(11, 8, 50, 83.333333);

      act(() => render(<ZoomInput {...{ app }} />, container));
      expect(container.firstChild.value).toBe('60%');
    });

    test('rounding the zoom to an integer', () => {
      app.drawing.svg.attr('width', 25);
      app.drawing.svg.attr('height', 75);
      app.drawing.svg.viewbox(5, 3, 34.803212, 104.409636);

      act(() => render(<ZoomInput {...{ app }} />, container));
      expect(container.firstChild.value).toBe('72%');
    });

    test('when the zoom is nonfinite', () => {
      // width and height are zero
      app.drawing.svg.attr('width', 0);
      app.drawing.svg.attr('height', 0);
      app.drawing.svg.viewbox(0, 0, 100, 200);

      act(() => render(<ZoomInput {...{ app }} />, container));
      expect(container.firstChild.value).toBe('0%');
    });

    test('when the zoom cannot be calculated', () => {
      // width and height are non-numeric
      app.drawing.svg.attr('width', 'asdf');
      app.drawing.svg.attr('height', 'qwer');

      // check that non-numeric values are not automatically ignored
      expect(app.drawing.svg.attr('width')).toBe('asdf');
      expect(app.drawing.svg.attr('height')).toBe('qwer');

      act(() => render(<ZoomInput {...{ app }} />, container));
      expect(container.firstChild.value).toBe('');
    });
  });

  describe('setting the zoom of the drawing', () => {
    test('on blur', () => {
      app.drawing.svg.viewbox(50, 12, 233, 544);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = '112';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      expect(app.drawing.svg.attr('width')).toBeCloseTo(260.96);
      expect(app.drawing.svg.attr('height')).toBeCloseTo(609.28);
    });

    test('on Enter key press', () => {
      app.drawing.svg.viewbox(1, 2, 300, 1000);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = '52';
      Simulate.change(container.firstChild);
      Simulate.keyUp(container.firstChild, { key: 'Enter' });

      expect(app.drawing.svg.attr('width')).toBeCloseTo(156);
      expect(app.drawing.svg.attr('height')).toBeCloseTo(520);
    });

    test('negative inputs', () => {
      app.drawing.svg.attr('width', 272);
      app.drawing.svg.attr('height', 204);
      app.drawing.svg.viewbox(0, 0, 400, 300);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = '-100';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // zoom is unchanged
      expect(app.drawing.svg.attr('width')).toBe(272);
      expect(app.drawing.svg.attr('height')).toBe(204);

      // value was reset
      expect(container.firstChild.value).toBe('68%');
    });

    test('an input of zero', () => {
      app.drawing.svg.attr('width', 893.2);
      app.drawing.svg.attr('height', 773.3);
      app.drawing.svg.viewbox(-10, -40, 812, 703);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = '0';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // zoom is unchanged
      expect(app.drawing.svg.attr('width')).toBe(893.2);
      expect(app.drawing.svg.attr('height')).toBe(773.3);

      // value was reset
      expect(container.firstChild.value).toBe('110%');
    });

    test('inputs that round to zero', () => {
      app.drawing.svg.attr('width', 893.2);
      app.drawing.svg.attr('height', 773.3);
      app.drawing.svg.viewbox(-10, -40, 812, 703);
      act(() => render(<ZoomInput {...{ app }} />, container));

      // must detect that the value is zero after rounding
      container.firstChild.value = '0.01';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // zoom is unchanged
      expect(app.drawing.svg.attr('width')).toBe(893.2);
      expect(app.drawing.svg.attr('height')).toBe(773.3);

      // value was reset
      expect(container.firstChild.value).toBe('110%');
    });

    test('inputs more than 50,000%', () => {
      app.drawing.svg.attr('width', 272);
      app.drawing.svg.attr('height', 204);
      app.drawing.svg.viewbox(0, 0, 400, 300);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = '50001';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // zoom is unchanged
      expect(app.drawing.svg.attr('width')).toBe(272);
      expect(app.drawing.svg.attr('height')).toBe(204);

      // value was reset
      expect(container.firstChild.value).toBe('68%');
    });

    test('lots of trailing decimal places', () => {
      app.drawing.svg.viewbox(0, 0, 120, 150);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = '58.826481726';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // values may change slightly depending on how rounding is done
      expect(app.drawing.svg.attr('width')).toBeCloseTo(70.8);
      expect(app.drawing.svg.attr('height')).toBeCloseTo(88.5);
    });

    test('a trailing percentage sign', () => {
      app.drawing.svg.viewbox(0, 0, 50, 40);
      act(() => render(<ZoomInput {...{ app }} />, container));

      // percentage sign should not affect anything
      container.firstChild.value = '80%';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      expect(app.drawing.svg.attr('width')).toBeCloseTo(40);
      expect(app.drawing.svg.attr('height')).toBeCloseTo(32);
    });

    test('nonfinite inputs', () => {
      app.drawing.svg.attr('width', 50);
      app.drawing.svg.attr('height', 60);
      app.drawing.svg.viewbox(0, 0, 100, 120);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = 'Infinity';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // zoom is unchanged
      expect(app.drawing.svg.attr('width')).toBe(50);
      expect(app.drawing.svg.attr('height')).toBe(60);

      // value was reset
      expect(container.firstChild.value).toBe('50%');
    });

    test('non-numeric inputs', () => {
      app.drawing.svg.attr('width', 75);
      app.drawing.svg.attr('height', 150);
      app.drawing.svg.viewbox(0, 0, 100, 200);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = 'asdf';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // zoom is unchanged
      expect(app.drawing.svg.attr('width')).toBe(75);
      expect(app.drawing.svg.attr('height')).toBe(150);

      // value was reset
      expect(container.firstChild.value).toBe('75%');
    });

    test('blank inputs', () => {
      app.drawing.svg.attr('width', 400);
      app.drawing.svg.attr('height', 300);
      app.drawing.svg.viewbox(0, 0, 200, 150);
      act(() => render(<ZoomInput {...{ app }} />, container));

      container.firstChild.value = '     ';
      Simulate.change(container.firstChild);
      Simulate.blur(container.firstChild);

      // zoom is unchanged
      expect(app.drawing.svg.attr('width')).toBe(400);
      expect(app.drawing.svg.attr('height')).toBe(300);

      // value was reset
      expect(container.firstChild.value).toBe('200%');
    });
  });
});
