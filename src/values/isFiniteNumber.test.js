import { isFiniteNumber } from './isFiniteNumber';

describe('isFiniteNumber function', () => {
  test('non-number values', () => {
    expect(isFiniteNumber(undefined)).toBe(false);
    expect(isFiniteNumber(null)).toBe(false);

    expect(isFiniteNumber(true)).toBe(false);
    expect(isFiniteNumber(false)).toBe(false);

    expect(isFiniteNumber('')).toBe(false);
    expect(isFiniteNumber('0')).toBe(false);
    expect(isFiniteNumber('asdf')).toBe(false);

    expect(isFiniteNumber({})).toBe(false);
    expect(isFiniteNumber([])).toBe(false);
  });

  test('nonfinite numbers', () => {
    expect(isFiniteNumber(NaN)).toBe(false);
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber(-Infinity)).toBe(false);
  });

  test('finite numbers', () => {
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(2)).toBe(true);
    expect(isFiniteNumber(-8)).toBe(true);

    expect(isFiniteNumber(0.482)).toBe(true);
    expect(isFiniteNumber(-0.1879)).toBe(true);

    expect(isFiniteNumber(1251134.13987)).toBe(true);
    expect(isFiniteNumber(-3819.138)).toBe(true);
  });
});
