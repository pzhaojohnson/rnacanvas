import { createStem } from 'Partners/stems/Stem';
import { sortNumbers } from '@rnacanvas/math';

import { downstreamSideOfStem } from './downstreamSideOfStem';

describe('downstreamSideOfStem function', () => {
  test('a stem with just one pair', () => {
    let stem = createStem({ bottomPair: [12, 33], numPairs: 1 });
    let side = downstreamSideOfStem(stem);
    expect(side).toStrictEqual([33]);
  });

  test('a stem with more than one pair', () => {
    let stem = createStem({ bottomPair: [158, 123], numPairs: 5 });
    let side = downstreamSideOfStem(stem);
    sortNumbers(side);
    expect(side).toStrictEqual([154, 155, 156, 157, 158]);
  });
});
