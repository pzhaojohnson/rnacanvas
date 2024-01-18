/**
 * Reports on the state of a condition when called.
 */
export type ConditionCallback = () => boolean;

/**
 * Returns a promise that resolves once the condition callback returns
 * true.
 *
 * Uses the setInterval function to check the return value of the
 * condition callback at a regular interval.
 *
 * Currently checks the return value of the condition callback every
 * 50 ms.
 *
 * Since the condition callback might be called many times, it is
 * recommended that it not be computationally intensive.
 */
export function waitUntil(conditionCallback: ConditionCallback) {
  return new Promise<void>(resolve => {
    let intervalId = setInterval(() => {
      if (conditionCallback()) {
        clearInterval(intervalId);
        resolve();
      }
    }, 50);
  });
}
