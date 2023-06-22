import { ElapsedTimeCalculator } from './ElapsedTimeCalculator';

describe('ElapsedTimeCalculator class', () => {
  it('starts counting upon instantiation', () => {
    let calculator = new ElapsedTimeCalculator();

    return new Promise(resolve => {
      setTimeout(() => {
        let t = calculator.calculate();
        expect(t).toBeGreaterThanOrEqual(3190);
        expect(t).toBeLessThan(3200);
        resolve();
      }, 3190);
    });
  });

  test('counting can be restarted', () => {
    let calculator = new ElapsedTimeCalculator();

    setTimeout(() => calculator.restartCounting(), 820);

    return new Promise(resolve => {
      setTimeout(() => {
        let t = calculator.calculate();

        // use 830 instead of 820 for a little bit of extra wiggle room
        expect(t).toBeGreaterThanOrEqual(4230 - 830);
        expect(t).toBeLessThan(4230 - 830 + 20);

        resolve();
      }, 4230);
    });
  });
});
