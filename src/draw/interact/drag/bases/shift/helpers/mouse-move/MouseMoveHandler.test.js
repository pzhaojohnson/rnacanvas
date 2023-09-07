import { MouseMoveHandler } from './MouseMoveHandler';

let shouldRespondToMouseMoveDecider = null;

let ghostInteractionOverlayShiftCalculator = null;

let ghostInteractionOverlayShifter = null;

let mouseMoveHandler = null;

beforeEach(() => {
  shouldRespondToMouseMoveDecider = {
    decide: () => false,
  };

  ghostInteractionOverlayShiftCalculator = {
    calculateFor: () => ({ x: 0, y: 0 }),
  };

  ghostInteractionOverlayShifter = {
    setShift: () => {},
  };

  mouseMoveHandler = new MouseMoveHandler({
    shouldRespondToMouseMoveDecider,
    ghostInteractionOverlayShiftCalculator,
    ghostInteractionOverlayShifter,
  });
});

afterEach(() => {
  mouseMoveHandler = null;

  ghostInteractionOverlayShifter = null;

  ghostInteractionOverlayShiftCalculator = null;

  shouldRespondToMouseMoveDecider = null;
});

describe('MouseMoveHandler class', () => {
  describe('handle method', () => {
    it('does nothing when the should-respond-to-mouse-move decider says not to', () => {
      shouldRespondToMouseMoveDecider.decide = () => false;

      ghostInteractionOverlayShifter.setShift = jest.fn();

      mouseMoveHandler.handle('A mouse move event');

      expect(ghostInteractionOverlayShifter.setShift).not.toHaveBeenCalled();
    });

    it('passes the mouse move event to the ghost interaction overlay shift calculator', () => {
      shouldRespondToMouseMoveDecider.decide = () => true;

      ghostInteractionOverlayShiftCalculator.calculateFor = jest.fn(() => ({ x: 0, y: 0 }));

      mouseMoveHandler.handle('Mouse move - 1984y4q3ilfa');

      expect(ghostInteractionOverlayShiftCalculator.calculateFor).toHaveBeenCalledTimes(1);
      expect(ghostInteractionOverlayShiftCalculator.calculateFor.mock.calls[0][0]).toBe('Mouse move - 1984y4q3ilfa');
    });

    it('sets the shift of the ghost interaction overlay to the calculated values', () => {
      shouldRespondToMouseMoveDecider.decide = () => true;

      ghostInteractionOverlayShiftCalculator.calculateFor = () => ({ x: 439.372, y: -3178 });

      ghostInteractionOverlayShifter.setShift = jest.fn();

      mouseMoveHandler.handle('A mouse move event');

      expect(ghostInteractionOverlayShifter.setShift).toHaveBeenCalledTimes(1);

      expect(ghostInteractionOverlayShifter.setShift.mock.calls[0][0]).toBe(439.372);
      expect(ghostInteractionOverlayShifter.setShift.mock.calls[0][1]).toBe(-3178);
    });
  });
});
