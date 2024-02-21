import { createStem } from 'Partners/stems/Stem';
import { sortNumbers } from '@rnacanvas/math';

import { upstreamSideOfStem } from './upstreamSideOfStem';

describe('upstreamSideOfStem function', () => {
  test('a stem with just one pair', () => {
    let stem = createStem({ bottomPair: [12, 33], numPairs: 1 });
    let side = upstreamSideOfStem(stem);
    expect(side).toStrictEqual([12]);
  });

  test('a stem with more than one pair', () => {
    let stem = createStem({ bottomPair: [156, 123], numPairs: 5 });
    let side = upstreamSideOfStem(stem);
    sortNumbers(side);
    expect(side).toStrictEqual([123, 124, 125, 126, 127]);
  });
});
