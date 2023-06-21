import { waitUntil } from './waitUntil';

describe('waitUntil function', () => {
  test('a condition callback that returns true after 4.2 seconds', () => {
    let t1 = Date.now();

    let returnValue = false;

    // change to true after 4.2 seconds
    setTimeout(() => returnValue = true, 4200);

    let resolved = false;

    // should still be false after only 4.15 seconds
    setTimeout(() => {
      expect(resolved).toBe(false);
    }, 4150);

    return waitUntil(() => returnValue).then(() => {
      let t2 = Date.now();
      let timeDiff = t2 - t1;
      expect(timeDiff).toBeGreaterThanOrEqual(4200);

      // assumes that the condition callback is checked every 250 ms
      expect(timeDiff).toBeLessThan(4200 + 300);
    });
  });

  test('a condition callback that already returns true', () => {
    let t1 = Date.now();

    return waitUntil(() => true).then(() => {
      let t2 = Date.now();
      let timeDiff = t2 - t1;
      expect(timeDiff).toBeGreaterThanOrEqual(0);

      // assumes that the condition callback is checked every 250 ms
      expect(timeDiff).toBeLessThan(300);
    });
  });

  it('clears the interval', () => {
    let returnValue = false;

    // change to true after 1.8 seconds
    setTimeout(() => returnValue = true, 1800);

    // how many times the condition callback returned true
    let returnedTrueCount = 0;

    let conditionCallback = () => {
      if (returnValue) {
        returnedTrueCount++;
      }
      return returnValue;
    };

    // how many times the promise was resolved
    let resolvedCount = 0;

    waitUntil(conditionCallback).then(() => {
      resolvedCount++;
    });

    return new Promise(resolve => {
      setTimeout(
        () => {
          expect(returnedTrueCount).toBe(1);
          expect(resolvedCount).toBe(1);
          resolve();
        },
        4800, // enough time for the interval to run too many times
      );
    });
  });
});
