import { parseTertiaryInteraction } from './parseTertiaryInteraction';

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

// seems to be necessary for the createSVGColor function to work on
// Node.js
Object.defineProperty(window, 'getComputedStyle', {
  value: ele => ({ color: colors[ele.style.color] }),
});

describe('parseTertiaryInteraction function', () => {
  test('a valid tertiary interaction string', () => {
    let string = '5:7,14:16,gold,1.500000,1.200000,0.600000,0.600000,3.376302,1.925795,True,True,1.200000,0.600000,0.600000';
    let data = parseTertiaryInteraction(string);

    expect(data.side1).toEqual({ start: 5, end: 7 });
    expect(data.side2).toEqual({ start: 14, end: 16 });
    expect(data.color.toHex().toLowerCase()).toBe('#ffd700');
  });

  test('empty string', () => {
    let string = '';
    let data = parseTertiaryInteraction(string);
    expect(data).toBeUndefined();
  });

  test('missing side 2 string and color name', () => {
    let string = '5:7';
    let data = parseTertiaryInteraction(string);
    expect(data).toBeUndefined();
  });

  test('missing color name', () => {
    let string = '15:17,102:108';
    let data = parseTertiaryInteraction(string);

    expect(data.side1).toEqual({ start: 15, end: 17 });
    expect(data.side2).toEqual({ start: 102, end: 108 });
    expect(data.color.toHex()).toBe('#000000'); // defaults to black
  });

  test('invalid side 1 start position', () => {
    let string = 'q:7,14:16,gold,1.500000,1.200000,0.600000,0.600000,3.376302,1.925795,True,True,1.200000,0.600000,0.600000';
    let data = parseTertiaryInteraction(string);
    expect(data).toBeUndefined();
  });

  test('invalid side 1 end position', () => {
    let string = '5:hg,14:16,gold,1.500000,1.200000,0.600000,0.600000,3.376302,1.925795,True,True,1.200000,0.600000,0.600000';
    let data = parseTertiaryInteraction(string);
    expect(data).toBeUndefined();
  });

  test('invalid side 2 start position', () => {
    let string = '5:7,kp:16,gold,1.500000,1.200000,0.600000,0.600000,3.376302,1.925795,True,True,1.200000,0.600000,0.600000';
    let data = parseTertiaryInteraction(string);
    expect(data).toBeUndefined();
  });

  test('invalid side 2 end position', () => {
    let string = '5:7,14:vv,gold,1.500000,1.200000,0.600000,0.600000,3.376302,1.925795,True,True,1.200000,0.600000,0.600000';
    let data = parseTertiaryInteraction(string);
    expect(data).toBeUndefined();
  });

  test('invalid color name', () => {
    let string = '54:72,18:22,zxcv,1.500000,1.200000,0.600000,0.600000,3.376302,1.925795,True,True,1.200000,0.600000,0.600000';
    let data = parseTertiaryInteraction(string);

    expect(data.side1).toEqual({ start: 54, end: 72 });
    expect(data.side2).toEqual({ start: 18, end: 22 });

    // the SVG.Color constructor seems to evaluate invalid color names
    // to black
    expect(data.color.toHex()).toBe('#000000');
  });
});
