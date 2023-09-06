import { InteractionOverlayGhoster } from './InteractionOverlayGhoster';

let nodeCloner = null;

let interactionOverlayGhoster = null;

let interactionOverlay = null;

beforeEach(() => {
  nodeCloner = {
    deepClone: () => ({
      style: {},
    }),
  };

  interactionOverlayGhoster = new InteractionOverlayGhoster({
    nodeCloner,
  });

  interactionOverlay = {
    after: () => {},
    getBoundingClientRect: () => ({ x: 0, y: 0 }),
  };
});

afterEach(() => {
  interactionOverlay = null;

  interactionOverlayGhoster = null;

  nodeCloner = null;
});

describe('InteractionOverlayGhoster class', () => {
  describe('ghost method', () => {
    it('creates and returns a deep clone of the interaction overlay', () => {
      nodeCloner.deepClone = jest.fn(() => ({
        textContent: 'Interaction overlay clone - 198423qi23',
        style: {},
      }));

      let ghost = interactionOverlayGhoster.ghost(interactionOverlay);

      expect(nodeCloner.deepClone).toHaveBeenCalledTimes(1);

      expect(nodeCloner.deepClone.mock.calls[0][0]).toBe(interactionOverlay);
      expect(interactionOverlay).toBeTruthy();

      expect(ghost.textContent).toMatch('Interaction overlay clone - 198423qi23');
    });

    it('inserts the ghost interaction overlay into the document immediately after the interaction overlay', () => {
      interactionOverlay.after = jest.fn();

      let ghost = interactionOverlayGhoster.ghost(interactionOverlay);

      expect(interactionOverlay.after).toHaveBeenCalledTimes(1);

      expect(interactionOverlay.after.mock.calls[0][0]).toBe(ghost);
      expect(ghost).toBeTruthy();
    });

    it('positions the ghost interaction overlay directly on top of the interaction overlay', () => {
      interactionOverlay.getBoundingClientRect = () => ({ x: 238.3781, y: 816.319 });

      let ghost = interactionOverlayGhoster.ghost(interactionOverlay);

      expect(ghost.style.position).toBe('fixed');
      expect(ghost.style.left).toBe('238.3781px');
      expect(ghost.style.top).toBe('816.319px');
    });

    it('sets the opacity of the ghost interaction overlay to 50%', () => {
      let ghost = interactionOverlayGhoster.ghost(interactionOverlay);

      expect(ghost.style.opacity).toBe('0.5');
    });

    it('disables all pointer events on the ghost interaction overlay', () => {
      let ghost = interactionOverlayGhoster.ghost(interactionOverlay);

      expect(ghost.style.pointerEvents).toBe('none');
    });
  });
});
