import { createStem } from 'Partners/stems/Stem';

import { StemWrapper } from './StemWrapper';

describe('StemWrapper class', () => {
  test('constructor and stem property', () => {
    let st = createStem({ bottomPair: [20, 56], numPairs: 3 });

    let stem = new StemWrapper(st); // from a stem object
    expect(stem.stem).toBe(st);

    stem = new StemWrapper(new StemWrapper(stem)); // from another stem wrapper
    expect(stem.stem).toBe(st);
  });

  test('deepCopy method', () => {
    let stem = new StemWrapper(createStem({ bottomPair: [1012, 2009], numPairs: 44 }));
    let deepCopy = stem.deepCopy();
    expect(deepCopy).not.toBe(stem); // created a new stem wrapper
    expect(deepCopy.stem).not.toBe(stem.stem); // created a new wrapped stem
    expect(deepCopy.equals(stem)).toBeTruthy(); // is a copy
  });

  test('pairs method', () => {
    let stem = new StemWrapper(createStem({ bottomPair: [78, 43], numPairs: 4 }));
    let pairs = stem.pairs();
    expect(pairs.length).toBe(4);
    expect(pairs.find(pair => pair.equals([43, 78]))).toBeTruthy();
    expect(pairs.find(pair => pair.equals([44, 77]))).toBeTruthy();
    expect(pairs.find(pair => pair.equals([45, 76]))).toBeTruthy();
    expect(pairs.find(pair => pair.equals([46, 75]))).toBeTruthy();
  });

  test('numPairs getter', () => {
    let stem = new StemWrapper(createStem({ bottomPair: [1, 100], numPairs: 16 }));
    expect(stem.numPairs).toBe(16);
  });

  test('bottomPair and topPair methods', () => {
    let stem = new StemWrapper(createStem({ bottomPair: [79, 3], numPairs: 8 }));

    let bottomPair = stem.bottomPair();
    expect(bottomPair.upstreamPartner).toBe(3);
    expect(bottomPair.downstreamPartner).toBe(79);

    let topPair = stem.topPair();
    expect(topPair.upstreamPartner).toBe(10);
    expect(topPair.downstreamPartner).toBe(72);
  });

  test('upstreamSide and downstreamSide methods', () => {
    let stem = new StemWrapper(createStem({ bottomPair: [37, 84], numPairs: 5 }));
    expect(stem.upstreamSide()).toStrictEqual([37, 38, 39, 40, 41]);
    expect(stem.downstreamSide()).toStrictEqual([84, 83, 82, 81, 80]);
  });

  test('equals method', () => {
    // bottom pair partners in different orders
    let stem = new StemWrapper(createStem({ bottomPair: [3, 72], numPairs: 2 }));
    let otherStem = createStem({ bottomPair: [72, 3], numPairs: 2 });
    expect(stem.equals(otherStem)).toBeTruthy();
    expect(stem.equals(new StemWrapper(otherStem))).toBeTruthy();

    // one bottom pair partner different
    stem = new StemWrapper(createStem({ bottomPair: [4, 200], numPairs: 7 }));
    otherStem = createStem({ bottomPair: [5, 200], numPairs: 7 });
    expect(stem.equals(otherStem)).toBeFalsy();
    expect(stem.equals(new StemWrapper(otherStem))).toBeFalsy();
  });

  test('containsPosition method', () => {
    let stem = new StemWrapper(createStem({ bottomPair: [4, 98], numPairs: 6 }));
    expect(stem.containsPosition(1)).toBeFalsy();
    expect(stem.containsPosition(5)).toBeTruthy();
    expect(stem.containsPosition(50)).toBeFalsy();
    expect(stem.containsPosition(94)).toBeTruthy();
    expect(stem.containsPosition(200)).toBeFalsy();
  });

  test('enclosesPosition method', () => {
    let stem = new StemWrapper(createStem({ bottomPair: [102, 125], numPairs: 2 }));
    expect(stem.enclosesPosition(98)).toBeFalsy();
    expect(stem.enclosesPosition(111)).toBeTruthy();
    expect(stem.enclosesPosition(150)).toBeFalsy();
  });
});
