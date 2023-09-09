import { EditingToolIsSetToSelectDraggedOverBases } from './EditingToolIsSetToSelectDraggedOverBases';

let app = null;

let editingToolIsSetToSelectDraggedOverBases = null;

beforeEach(() => {
  app = {
    drawingInteraction: {
      editingTool: {
        whenDraggingBases: undefined,
      },
    },
  };

  editingToolIsSetToSelectDraggedOverBases = new EditingToolIsSetToSelectDraggedOverBases({ app });
});

afterEach(() => {
  editingToolIsSetToSelectDraggedOverBases = null;

  app = null;
});

describe('EditingToolIsSetToSelectDraggedOverBases class', () => {
  describe('isTrue method', () => {
    it('returns true when editing tool whenDraggingBases property is the string "select"', () => {
      app.drawingInteraction.editingTool.whenDraggingBases = 'select';
      expect(editingToolIsSetToSelectDraggedOverBases.isTrue()).toBe(true);
    });

    it('returns false when editing tool whenDraggingBases property is a string other than "select"', () => {
      app.drawingInteraction.editingTool.whenDraggingBases = 'shift';
      expect(editingToolIsSetToSelectDraggedOverBases.isTrue()).toBe(false);
    });

    it('returns false when editing tool whenDraggingBases property is undefined', () => {
      app.drawingInteraction.editingTool.whenDraggingBases = undefined;
      expect(editingToolIsSetToSelectDraggedOverBases.isTrue()).toBe(false);
    });
  });
});
