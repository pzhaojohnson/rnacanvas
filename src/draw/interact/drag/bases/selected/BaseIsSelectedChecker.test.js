import { BaseIsSelectedChecker } from './BaseIsSelectedChecker';

let app = null;

let baseIsSelectedChecker = null;

beforeEach(() => {
  app = {
    drawingInteraction: {
      editingTool: {
        isSelected: () => false,
      },
    },
  };

  baseIsSelectedChecker = new BaseIsSelectedChecker({ app });
});

afterEach(() => {
  baseIsSelectedChecker = null;

  app = null;
});

describe('BaseIsSelectedChecker class', () => {
  describe('check method', () => {
    it('passes the base to the isSelected method of the editing tool', () => {
      let isSelected = jest.fn(() => false);
      app.drawingInteraction.editingTool.isSelected = isSelected;

      baseIsSelectedChecker.check('base - 1891r3iuwehf');

      expect(isSelected).toHaveBeenCalledTimes(1);
      expect(isSelected.mock.calls[0][0]).toBe('base - 1891r3iuwehf');
    });

    it('returns what the isSelected method of the editing tool returns', () => {
      app.drawingInteraction.editingTool.isSelected = () => true;
      expect(baseIsSelectedChecker.check('base 1')).toBe(true);

      app.drawingInteraction.editingTool.isSelected = () => false;
      expect(baseIsSelectedChecker.check('base 1')).toBe(false);
    });
  });
});
