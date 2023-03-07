import { pickOneRandom } from './pickOneRandom';

describe('pickOneRandom function', () => {
  test('an empty array', () => {
    let array = [];
    expect(pickOneRandom(array)).toBeUndefined();
  });

  test('an array with one item', () => {
    let array = [5];
    expect(pickOneRandom(array)).toBe(5);
  });

  test('an array with eight items', () => {
    let array = ['1', 2, 'c', 'D', false, 'zxcv', 102, -8];
    let picked = [];

    for (let i = 0; i < 500; i++) {
      picked.push(pickOneRandom(array));
    }

    picked.forEach(item => {
      expect(array.includes(item)).toBeTruthy();
      expect(item).not.toBeUndefined();
    });

    // doesn't always just pick the same item
    expect((new Set(picked)).size).toBeGreaterThan(1);
  });
});
