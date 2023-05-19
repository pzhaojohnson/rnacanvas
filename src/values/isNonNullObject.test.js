import { isNonNullObject } from './isNonNullObject';

test('isNonNullObject function', () => {
  // some non-null objects
  expect(isNonNullObject({})).toBe(true);
  expect(isNonNullObject({ 'asdf': 2 })).toBe(true);
  expect(isNonNullObject({ 'a': null, '15': undefined })).toBe(true);

  // some arrays
  expect(isNonNullObject([])).toBe(true);
  expect(isNonNullObject([1, 'a', 5, 10, false])).toBe(true);

  // the value null
  expect(isNonNullObject(null)).toBe(false);

  // values that are not objects and not null
  expect(isNonNullObject(3)).toBe(false);
  expect(isNonNullObject('q')).toBe(false);
  expect(isNonNullObject(true)).toBe(false);
  expect(isNonNullObject(undefined)).toBe(false);
});
