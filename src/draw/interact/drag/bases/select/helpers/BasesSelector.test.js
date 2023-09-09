import { BasesSelector } from './BasesSelector';

let app = null;

let basesSelector = null;

beforeEach(() => {
  app = {
    drawingInteraction: {
      editingTool: {
        addToSelected: () => {},
      },
    },
  };

  basesSelector = new BasesSelector({ app });
});

afterEach(() => {
  basesSelector = null;

  app = null;
});

describe('BasesSelector class', () => {
  describe('addToSelected method', () => {
    it('does nothing for an empty array of bases', () => {
      app.drawingInteraction.editingTool.addToSelected = jest.fn();

      basesSelector.addToSelected([]);

      expect(app.drawingInteraction.editingTool.addToSelected).not.toHaveBeenCalled();
    });

    it('forwards the given bases to the addToSelected method of the editing tool', () => {
      app.drawingInteraction.editingTool.addToSelected = jest.fn();

      basesSelector.addToSelected(['Base - 37y', 'Base - 198r', 'Base - 4824uo', 'Base - d892']);

      expect(app.drawingInteraction.editingTool.addToSelected).toHaveBeenCalledTimes(1);

      expect(app.drawingInteraction.editingTool.addToSelected.mock.calls[0][0]).toStrictEqual(
        ['Base - 37y', 'Base - 198r', 'Base - 4824uo', 'Base - d892']
      );
    });
  });
});
