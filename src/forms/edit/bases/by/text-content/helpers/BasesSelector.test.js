import { Base } from 'Draw/bases/Base';

import { BasesSelector } from './BasesSelector';

function createAppMock() {
  return {
    drawingInteraction: {
      currentTool: null,
      editingTool: {
        editingType: null,
        select: () => {},
        renderForm: () => {},
      },
    },
  };
}

let app = null;

let selectBasesByTextContentFormCloser = null;

let basesSelector = null;

beforeEach(() => {
  app = createAppMock();

  selectBasesByTextContentFormCloser = {
    close: () => {},
  };

  basesSelector = new BasesSelector({
    app,
    selectBasesByTextContentFormCloser,
  });
});

afterEach(() => {
  basesSelector = null;

  selectBasesByTextContentFormCloser = null;

  app = null;
});

describe('BasesSelector class', () => {
  describe('select method', () => {
    it('closes the select-bases-by-text-content form', () => {
      selectBasesByTextContentFormCloser.close = jest.fn();

      basesSelector.select(['base1', 'base2']);

      expect(selectBasesByTextContentFormCloser.close)
        .toHaveBeenCalledTimes(1);
    });

    it('switches to the editing tool', () => {
      let editingTool = app.drawingInteraction.editingTool;
      expect(editingTool).toBeTruthy();

      app.drawingInteraction.currentTool = null;

      basesSelector.select(['base1']);

      expect(app.drawingInteraction.currentTool).toBe(editingTool);
    });

    it('sets the editing tool to edit bases', () => {
      app.drawingInteraction.editingTool.editingType = null;

      basesSelector.select(['base1', 'base2', 'base3']);

      expect(app.drawingInteraction.editingTool.editingType).toBe(Base);
      expect(Base).toBeTruthy();
    });

    it('sets the specified bases to be the selected elements', () => {
      app.drawingInteraction.editingTool.select = jest.fn();

      basesSelector.select(['base-3198u18', 'base-328993', 'base-3981984']);

      expect(app.drawingInteraction.editingTool.select)
        .toHaveBeenCalledTimes(1);

      expect(app.drawingInteraction.editingTool.select.mock.calls[0][0])
        .toStrictEqual(['base-3198u18', 'base-328993', 'base-3981984']);
    });

    it('opens the editing tool form to edit the selected bases', () => {
      app.drawingInteraction.editingTool.renderForm = jest.fn();

      basesSelector.select(['base1', 'base2']);

      expect(app.drawingInteraction.editingTool.renderForm)
        .toHaveBeenCalledTimes(1);
    });
  });
});
