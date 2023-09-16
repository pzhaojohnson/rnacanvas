import { CurrentToolIsTheEditingTool } from './CurrentToolIsTheEditingTool';

let app = null;

let currentToolIsTheEditingTool = null;

beforeEach(() => {
  app = {
    drawingInteraction: {
      currentTool: 'A tool',
      editingTool: 'The editing tool',
    },
  };

  currentToolIsTheEditingTool = new CurrentToolIsTheEditingTool({ app });
});

afterEach(() => {
  currentToolIsTheEditingTool = null;

  app = null;
});

describe('CurrentToolIsTheEditingTool class', () => {
  describe('isTrue method', () => {
    it('returns true when the current tool is the editing tool', () => {
      app.drawingInteraction.editingTool = 'Editing tool - 298ruiweh';
      app.drawingInteraction.currentTool = 'Editing tool - 298ruiweh';
      expect(currentToolIsTheEditingTool.isTrue()).toBe(true);
    });

    it('returns false when the current tool is not the editing tool', () => {
      app.drawingInteraction.editingTool = 'The editing tool';
      app.drawingInteraction.currentTool = 'The pairing tool';
      expect(currentToolIsTheEditingTool.isTrue()).toBe(false);
    });
  });
});
