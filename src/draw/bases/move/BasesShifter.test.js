import { BasesShifter } from './BasesShifter';

function createBaseMock() {
  return {
    getCenter: () => ({ x: 0, y: 0 }),
    setCenter: () => {},
  };
}

let tasksToDoAfterMovingBases = null;

let basesShifter = null;

beforeEach(() => {
  tasksToDoAfterMovingBases = {
    do: () => {},
  };

  basesShifter = new BasesShifter({
    tasksToDoAfterMovingBases,
  });
});

afterEach(() => {
  basesShifter = null;

  tasksToDoAfterMovingBases = null;
});

describe('BasesShifter class', () => {
  describe('shiftBases method', () => {
    it('shifts the center coordinates of the provided bases', () => {
      let bases = [createBaseMock(), createBaseMock(), createBaseMock()];

      bases[0].getCenter = () => ({ x: 12, y: -8 });
      bases[1].getCenter = () => ({ x: 125, y: 0 });
      bases[2].getCenter = () => ({ x: 507, y: -88 });

      bases.forEach(b => b.setCenter = jest.fn());

      basesShifter.shiftBases({ bases, x: 21, y: 4 });

      bases.forEach(b => expect(b.setCenter).toHaveBeenCalledTimes(1));

      expect(bases[0].setCenter.mock.calls[0][0]).toStrictEqual({ x: 33, y: -4 });
      expect(bases[1].setCenter.mock.calls[0][0]).toStrictEqual({ x: 146, y: 4 });
      expect(bases[2].setCenter.mock.calls[0][0]).toStrictEqual({ x: 528, y: -84 });
    });

    it('does not throw for an empty array of bases', () => {
      let bases = [];
      let x = 5;
      let y = 6;

      expect(() => basesShifter.shiftBases({ bases, x, y })).not.toThrow();
    });

    it('does the follow-up tasks after shifting the bases', () => {
      let base1 = createBaseMock();
      let bases = [base1];

      base1.setCenter = jest.fn();

      tasksToDoAfterMovingBases.do = jest.fn(() => {
        // has been shifted
        expect(base1.setCenter).toHaveBeenCalledTimes(1);
      });

      basesShifter.shiftBases({ bases, x: 10, y: -5 });

      expect(tasksToDoAfterMovingBases.do).toHaveBeenCalledTimes(1);
    });
  });
});
