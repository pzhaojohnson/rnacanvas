import { GhostInteractionOverlayShifter } from './GhostInteractionOverlayShifter';

let interactionOverlayGetter = null;

let ghostInteractionOverlayProvider = null;

let ghostInteractionOverlayShifter = null;

beforeEach(() => {
  interactionOverlayGetter = {
    get: () => ({
      getBoundingClientRect: () => ({ x: 0, y: 0 }),
    }),
  };

  ghostInteractionOverlayProvider = {
    provideCurrent: () => ({
      style: {},
    }),
  };

  ghostInteractionOverlayShifter = new GhostInteractionOverlayShifter({
    interactionOverlayGetter,
    ghostInteractionOverlayProvider,
  });
});

afterEach(() => {
  ghostInteractionOverlayShifter = null;

  ghostInteractionOverlayProvider = null;

  interactionOverlayGetter = null;
});

describe('GhostInteractionOverlayShifter class', () => {
  describe('setShift method', () => {
    it('positions the ghost interaction overlay correctly', () => {
      interactionOverlayGetter.get = () => ({
        getBoundingClientRect: () => ({ x: 829, y: 1294 }),
      });

      let ghostInteractionOverlay = { style: {} };
      ghostInteractionOverlayProvider.provideCurrent = () => ghostInteractionOverlay;

      ghostInteractionOverlayShifter.setShift(153, -193);

      // might be safest to set to fixed positioning every time
      expect(ghostInteractionOverlay.style.position).toBe('fixed');

      expect(ghostInteractionOverlay.style.left).toBe('982px');
      expect(ghostInteractionOverlay.style.top).toBe('1101px');
    });
  });
});
