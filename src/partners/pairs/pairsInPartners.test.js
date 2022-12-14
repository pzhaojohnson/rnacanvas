import { pairsInPartners } from './pairsInPartners';

describe('pairsInPartners function', () => {
  test('empty partners', () => {
    expect(pairsInPartners([])).toStrictEqual([]);
  });

  test('unstructured partners', () => {
    let partners = [undefined, null, null, undefined];
    expect(pairsInPartners(partners)).toStrictEqual([]);
  });

  test('multiple stems', () => {
    let partners = [12, 11, null, 8,  7, undefined, 5, 4, undefined, null, 2, 1, null];
    expect(pairsInPartners(partners)).toStrictEqual(
      [[1, 12], [2, 11], [4, 8], [5, 7]]
    );
  });

  test('unassigned positions', () => {
    let partners = [6, 5, null, null, 2, 1];
    // must iterate over unassigned positions
    // to find this pair
    partners[25 - 1] = 32;
    partners[32 - 1] = 25;
    expect(pairsInPartners(partners)).toStrictEqual(
      [[1, 6], [2, 5], [25, 32]]
    );
  });
});
