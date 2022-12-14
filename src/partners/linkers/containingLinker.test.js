import { createLinker } from 'Partners/linkers/Linker';

import { containingLinker } from './containingLinker';

describe('containingLinker function', () => {
  describe('when a position is in a linker', () => {
    test('when a position is in a hairpin loop', () => {
      let partners = [9, 8, null, undefined, null, undefined, undefined, 2, 1];
      expect(containingLinker(partners, { position: 6 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 2, downstreamBoundingPosition: 8 })
      );
    });

    test('when a position is between two stems', () => {
      let partners = [6, 5, null, null, 2, 1, undefined, null, null, 15, 14, null, null, 11, 10];
      expect(containingLinker(partners, { position: 8 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 6, downstreamBoundingPosition: 10 })
      );
    });

    test('when a position is immediately downstream of a stem', () => {
      let partners = [6, 5, null, null, 2, 1, undefined, null, null, 15, 14, null, null, 11, 10];
      expect(containingLinker(partners, { position: 7 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 6, downstreamBoundingPosition: 10 })
      );
    });

    test('when a position is immediately upstream of a stem', () => {
      let partners = [6, 5, null, null, 2, 1, undefined, null, null, 15, 14, null, null, 11, 10];
      expect(containingLinker(partners, { position: 9 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 6, downstreamBoundingPosition: 10 })
      );
    });

    test('when a position is in the first linker in the structure', () => {
      let partners = [undefined, null, null, undefined, 11, 10, undefined, null, null, 6, 5];

      // not the first position
      expect(containingLinker(partners, { position: 3 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 0, downstreamBoundingPosition: 5 })
      );

      // the first position
      expect(containingLinker(partners, { position: 1 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 0, downstreamBoundingPosition: 5 })
      );
    });

    test('when a position is in the last linker in the structure', () => {
      let partners = [6, 5, null, null, 2, 1, undefined, undefined, null];

      // not the last position
      expect(containingLinker(partners, { position: 8 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 6, downstreamBoundingPosition: 10 })
      );

      // the last position
      expect(containingLinker(partners, { position: 9 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 6, downstreamBoundingPosition: 10 })
      );
    });

    test('unstructured partners', () => {
      let partners = [null, undefined, null, undefined, undefined];
      expect(containingLinker(partners, { position: 2 })).toStrictEqual(
        createLinker({ upstreamBoundingPosition: 0, downstreamBoundingPosition: 6 })
      );
    });
  });

  test('when a position is not in a linker', () => {
    let partners = [null, 10, 9, 8, null, null, null, 4, 3, 2, null, undefined];
    expect(containingLinker(partners, { position: 2 })).toBeUndefined();
    expect(containingLinker(partners, { position: 4 })).toBeUndefined();
    expect(containingLinker(partners, { position: 9 })).toBeUndefined();
    expect(containingLinker(partners, { position: 10 })).toBeUndefined();
  });

  describe('when a position is invalid', () => {
    test('when a position is out of range', () => {
      let partners = [6, 5, null, null, 2, 1, undefined, undefined];
      expect(containingLinker(partners, { position: 0 })).toBeUndefined();
      expect(containingLinker(partners, { position: -1 })).toBeUndefined();
      expect(containingLinker(partners, { position: -6 })).toBeUndefined();
      expect(containingLinker(partners, { position: 9 })).toBeUndefined();
      expect(containingLinker(partners, { position: 14 })).toBeUndefined();
    });

    test('nonfinite positions', () => {
      let partners = [6, 5, null, null, 2, 1, undefined, undefined];
      expect(containingLinker(partners, { position: NaN })).toBeUndefined();
      expect(containingLinker(partners, { position: Infinity })).toBeUndefined();
      expect(containingLinker(partners, { position: -Infinity })).toBeUndefined();
    });
  });
});
