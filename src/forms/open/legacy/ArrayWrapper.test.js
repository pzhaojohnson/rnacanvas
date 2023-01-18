import { ArrayWrapper } from './ArrayWrapper';

describe('ArrayWrapper class', () => {
  test('array property', () => {
    let array = [1, 2, 3];
    let arrayWrapper = new ArrayWrapper(array);
    expect(arrayWrapper.array).toBe(array);
  });

  test('length getter', () => {
    let arrayWrapper = new ArrayWrapper([]);
    expect(arrayWrapper.length).toBe(0);

    arrayWrapper = new ArrayWrapper(['asdf']);
    expect(arrayWrapper.length).toBe(1);

    arrayWrapper = new ArrayWrapper([1, 2, 'qwer']);
    expect(arrayWrapper.length).toBe(3);
  });

  test('atIndex method', () => {
    let arrayWrapper = new ArrayWrapper([6, '4', 'ab', 9, 'asdf', 'zxcv']);

    expect(arrayWrapper.atIndex(-20)).toBeUndefined();
    expect(arrayWrapper.atIndex(-1)).toBeUndefined();
    expect(arrayWrapper.atIndex(0)).toBe(6);
    expect(arrayWrapper.atIndex(1)).toBe('4');
    expect(arrayWrapper.atIndex(2)).toBe('ab');
    expect(arrayWrapper.atIndex(3)).toBe(9);
    expect(arrayWrapper.atIndex(4)).toBe('asdf');
    expect(arrayWrapper.atIndex(5)).toBe('zxcv');
    expect(arrayWrapper.atIndex(6)).toBeUndefined();
    expect(arrayWrapper.atIndex(24)).toBeUndefined();
  });

  test('lastItem getter', () => {
    let arrayWrapper = new ArrayWrapper([]);
    expect(arrayWrapper.lastItem).toBeUndefined();

    arrayWrapper = new ArrayWrapper([7]);
    expect(arrayWrapper.lastItem).toBe(7);

    arrayWrapper = new ArrayWrapper(['a', 'z', 5, 5, '87']);
    expect(arrayWrapper.lastItem).toBe('87');
  });
});
