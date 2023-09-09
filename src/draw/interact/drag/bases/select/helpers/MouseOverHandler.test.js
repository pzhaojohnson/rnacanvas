import { MouseOverHandler } from './MouseOverHandler';

let shouldRespondToMouseOverDecider = null;

let draggedOverBasesGetter = null;

let basesSelector = null;

let mouseOverHandler = null;

beforeEach(() => {
  shouldRespondToMouseOverDecider = {
    decide: () => false,
  };

  draggedOverBasesGetter = {
    getFor: () => [],
  };

  basesSelector = {
    addToSelected: () => {},
  };

  mouseOverHandler = new MouseOverHandler({
    shouldRespondToMouseOverDecider,
    draggedOverBasesGetter,
    basesSelector,
  });
});

afterEach(() => {
  mouseOverHandler = null;

  basesSelector = null;

  draggedOverBasesGetter = null;

  shouldRespondToMouseOverDecider = null;
});

describe('MouseOverHandler class', () => {
  describe('handle method', () => {
    it('does nothing if the should-respond-to-mouse-over decider says not to', () => {
      shouldRespondToMouseOverDecider.decide = () => false;

      basesSelector.addToSelected = jest.fn();

      mouseOverHandler.handle('A mouse over event');

      expect(basesSelector.addToSelected).not.toHaveBeenCalled();
    });

    it('passes the mouse over event to the dragged over bases getter', () => {
      shouldRespondToMouseOverDecider.decide = () => true;

      draggedOverBasesGetter.getFor = jest.fn(() => []);

      mouseOverHandler.handle('Mouse over - 984y183r2hiwuef');

      expect(draggedOverBasesGetter.getFor).toHaveBeenCalledTimes(1);
      expect(draggedOverBasesGetter.getFor.mock.calls[0][0]).toBe('Mouse over - 984y183r2hiwuef');
    });

    it('adds the dragged over bases to selected', () => {
      shouldRespondToMouseOverDecider.decide = () => true;

      draggedOverBasesGetter.getFor = () => ['Base - 2389', 'Base - dshu87', 'Base - 2r89', 'Base - had78'];

      basesSelector.addToSelected = jest.fn();

      mouseOverHandler.handle('A mouse over event');

      expect(basesSelector.addToSelected).toHaveBeenCalledTimes(1);

      expect(basesSelector.addToSelected.mock.calls[0][0]).toStrictEqual(
        ['Base - 2389', 'Base - dshu87', 'Base - 2r89', 'Base - had78']
      );
    });
  });
});
