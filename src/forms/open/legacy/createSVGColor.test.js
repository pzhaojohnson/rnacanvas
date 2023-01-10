import { createSVGColor } from './createSVGColor';

let colors = {
  'black': 'rgb(0, 0, 0)',
  'red': 'rgb(255, 0, 0)',
  'green': 'rgb(0, 255, 0)',
  'blue': 'rgb(0, 0, 255)',
  'cyan': 'rgb(0, 255, 255)',
  'orange': 'rgb(255, 165, 0)',
  'gold': 'rgb(255, 215, 0)',
  'lightyellow': 'rgb(255, 255, 224)',
};

// seems to be necessary on Node.js
Object.defineProperty(window, 'getComputedStyle', {
  value: ele => ({ color: colors[ele.style.color] }),
});

describe('createSVGColor function', () => {
  test('various colors', () => {
    Object.keys(colors).forEach(cssName => {
      let svgColor = createSVGColor({ cssName });
      let rgbString = `rgb(${svgColor.r}, ${svgColor.g}, ${svgColor.b})`;
      expect(rgbString).toBe(colors[cssName]);
    });
  });

  test('an invalid value', () => {
    let svgColor = createSVGColor({ cssName: 'qwer' });

    /* The SVG.Color constructor seems to evaluate to black for invalid
    values. */
    expect(svgColor.toHex()).toBe('#000000');
  });

  describe('removing the div element used to compute colors', () => {
    test('for a valid value', () => {
      let n = document.body.childNodes.length;
      createSVGColor({ cssName: 'red' });
      expect(document.body.childNodes.length).toBe(n); // unchanged
    });

    test('for an invalid value', () => {
      let n = document.body.childNodes.length;
      createSVGColor({ cssName: 'asdf' });
      expect(document.body.childNodes.length).toBe(n); // unchanged
    });
  });
});
