import { waitMilliseconds } from './waitMilliseconds';

describe('waitMilliseconds function', () => {
  test('waiting for positive milliseconds', () => {
    let t1 = Date.now();

    return waitMilliseconds(3471).then(() => {
      let t2 = Date.now();
      let diffT = t2 - t1;
      expect(diffT).toBeGreaterThanOrEqual(3471);

      // should not be too far off from 3471
      expect(diffT).toBeLessThan(3481);
    });
  });

  test('waiting for zero milliseconds', () => {
    let t1 = Date.now();

    return waitMilliseconds(0).then(() => {
      let t2 = Date.now();
      let diffT = t2 - t1;
      expect(diffT).toBeGreaterThanOrEqual(0);

      // should not be too far off from 0
      expect(diffT).toBeLessThan(10);
    });
  });

  test('waiting for negative milliseconds', () => {
    let t1 = Date.now();

    return waitMilliseconds(-1250).then(() => {
      let t2 = Date.now();
      let diffT = t2 - t1;
      expect(diffT).toBeGreaterThanOrEqual(0);

      // expected to be close to 0
      expect(diffT).toBeLessThan(10);
    });
  });
});
