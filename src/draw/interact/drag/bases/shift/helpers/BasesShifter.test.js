import { BasesShifter } from './BasesShifter';

let basesShifterToDecorate = null;

let tasksToDoBeforeShiftingBases = null;

let tasksToDoAfterShiftingBases = null;

let basesShifter = null;

beforeEach(() => {
  basesShifterToDecorate = {
    shiftBases: () => {},
  };

  tasksToDoBeforeShiftingBases = {
    do: () => {},
  };

  tasksToDoAfterShiftingBases = {
    do: () => {},
  };

  basesShifter = new BasesShifter({
    basesShifterToDecorate,
    tasksToDoBeforeShiftingBases,
    tasksToDoAfterShiftingBases,
  });
});

afterEach(() => {
  basesShifter = null;

  tasksToDoAfterShiftingBases = null;

  tasksToDoBeforeShiftingBases = null;

  basesShifterToDecorate = null;
});

describe('BasesShifter class', () => {
  describe('shiftBases method', () => {
    it('does the tasks to do before shifting bases before shifting bases', () => {
      basesShifterToDecorate.shiftBases = jest.fn();

      tasksToDoBeforeShiftingBases.do = jest.fn(() => {
        expect(basesShifterToDecorate.shiftBases).not.toHaveBeenCalled();
      });

      let bases = ['base 2'];
      basesShifter.shiftBases({ bases, x: 0, y: -10 });

      expect(tasksToDoBeforeShiftingBases.do).toHaveBeenCalledTimes(1);
    });

    it('passes bases and X and Y coordinate amounts to the decorated bases shifter', () => {
      basesShifterToDecorate.shiftBases = jest.fn();

      let bases = ['base - 184893', 'base - 30984u1r', 'base - 32u8rihwfars'];
      basesShifter.shiftBases({ bases, x: 56, y: -128.4 });

      expect(basesShifterToDecorate.shiftBases).toHaveBeenCalledTimes(1);

      let call = basesShifterToDecorate.shiftBases.mock.calls[0];
      expect(call[0].bases).toStrictEqual(['base - 184893', 'base - 30984u1r', 'base - 32u8rihwfars']);
      expect(call[0].x).toBe(56);
      expect(call[0].y).toBe(-128.4);
    });

    it('does the tasks to do after shifting bases after shifting bases', () => {
      basesShifterToDecorate.shiftBases = jest.fn();

      tasksToDoAfterShiftingBases.do = jest.fn(() => {
        expect(basesShifterToDecorate.shiftBases).toHaveBeenCalled();
      });

      let bases = ['base 1', 'base 2'];
      basesShifter.shiftBases({ bases, x: 1, y: 2 });

      expect(tasksToDoAfterShiftingBases.do).toHaveBeenCalledTimes(1);
    });

    it('does not throw for an empty bases array', () => {
      expect(() => {
        basesShifter.shiftBases({ bases: [], x: 12, y: 3 });
      }).not.toThrow();
    });
  });
});
