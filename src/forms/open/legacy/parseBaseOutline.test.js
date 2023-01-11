import { parseBaseOutline } from './parseBaseOutline';

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

describe('parseBaseOutline function', () => {
  it('parses stroke and fill', () => {
    let string = 'gold,1.220000,orange,1.000000';
    let data = parseBaseOutline(string);

    expect(data.stroke.toHex().toLowerCase()).toBe('#ffd700');
    expect(data.fill.toHex().toLowerCase()).toBe('#ffa500');
  });

  test('missing stroke and fill', () => {
    let string = ',1.220000,,1.000000';
    let data = parseBaseOutline(string);

    expect(data.stroke).toBeUndefined();
    expect(data.fill).toBeUndefined();
  });

  test('missing stroke', () => {
    let string = ',1.220000,orange,1.000000';
    let data = parseBaseOutline(string);

    expect(data.stroke).toBeUndefined();
    expect(data.fill.toHex().toLowerCase()).toBe('#ffa500');
  });

  test('missing fill', () => {
    let string = 'gold,1.220000,,1.000000';
    let data = parseBaseOutline(string);

    expect(data.stroke.toHex().toLowerCase()).toBe('#ffd700');
    expect(data.fill).toBeUndefined();
  });

  test('an empty string', () => {
    let string = '';
    let data = parseBaseOutline(string);
    expect(data).toBeUndefined();
  });
});
