import { RepositionAllBonds } from './RepositionAllBonds';

let allBondsGetter = null;

let repositionAllBonds = null;

beforeEach(() => {
  allBondsGetter = {
    get: () => [],
  };

  repositionAllBonds = new RepositionAllBonds({
    allBondsGetter,
  });
});

afterEach(() => {
  repositionAllBonds = null;

  allBondsGetter = null;
});

describe('RepositionAllBonds class', () => {
  describe('do method', () => {
    it('calls the reposition method of all bonds', () => {
      let allBonds = [
        { reposition: jest.fn() },
        { reposition: jest.fn() },
        { reposition: jest.fn() },
      ];

      allBondsGetter.get = () => allBonds;

      repositionAllBonds.do();

      expect(allBonds[0].reposition).toHaveBeenCalledTimes(1);
      expect(allBonds[1].reposition).toHaveBeenCalledTimes(1);
      expect(allBonds[2].reposition).toHaveBeenCalledTimes(1);
    });

    it('does nothing if there are no bonds', () => {
      allBondsGetter.get = () => [];
      expect(() => repositionAllBonds.do()).not.toThrow();
    });
  });
});
