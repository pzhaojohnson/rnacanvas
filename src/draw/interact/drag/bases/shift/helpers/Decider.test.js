import { Decider } from './Decider';

let conditions = null;

let decider = null;

beforeEach(() => {
  conditions = {
    allAreTrue: () => false,
  };

  decider = new Decider({ conditions });
});

afterEach(() => {
  decider = null;

  conditions = null;
});

describe('Decider class', () => {
  describe('decide method', () => {
    it('returns true if all conditions are true', () => {
      conditions.allAreTrue = () => true;
      expect(decider.decide()).toBe(true);
    });

    it('returns false if not all conditions are true', () => {
      conditions.allAreTrue = () => false;
      expect(decider.decide()).toBe(false);
    });
  });
});
