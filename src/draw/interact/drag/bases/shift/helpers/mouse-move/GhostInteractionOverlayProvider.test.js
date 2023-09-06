import { GhostInteractionOverlayProvider } from './GhostInteractionOverlayProvider';

let interactionOverlayGetter = null;

let interactionOverlayGhoster = null;

let mouseUpListener = null;

let window = null;

let ghostInteractionOverlayProvider = null;

beforeEach(() => {
  interactionOverlayGetter = {
    get: () => 'An interaction overlay',
  };

  interactionOverlayGhoster = {
    ghost: () => ({
      remove: () => {},
    }),
  };

  window = {
    addEventListener: (name, listener) => {
      if (name === 'mouseup') {
        mouseUpListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };

  ghostInteractionOverlayProvider = new GhostInteractionOverlayProvider({
    interactionOverlayGetter,
    interactionOverlayGhoster,
    window,
  });
});

afterEach(() => {
  ghostInteractionOverlayProvider = null;

  window = null;

  mouseUpListener = null;

  interactionOverlayGhoster = null;

  interactionOverlayGetter = null;
});

describe('GhostInteractionOverlayProvider class', () => {
  describe('provideCurrent method', () => {
    it('ghosts the interaction overlay when called for the first time', () => {
      interactionOverlayGhoster.ghost = () => 'Ghost interaction overlay - 94qiwfajdl32';

      expect(ghostInteractionOverlayProvider.provideCurrent()).toBe('Ghost interaction overlay - 94qiwfajdl32');
    });

    it('passes the interaction overlay to the interaction overlay ghoster', () => {
      interactionOverlayGetter.get = () => 'Interaction overlay - 298urwiefsdkjl';

      interactionOverlayGhoster.ghost = jest.fn(() => 'A ghost interaction overlay');

      ghostInteractionOverlayProvider.provideCurrent();

      expect(interactionOverlayGhoster.ghost).toHaveBeenCalledTimes(1);
      expect(interactionOverlayGhoster.ghost.mock.calls[0][0]).toBe('Interaction overlay - 298urwiefsdkjl');
    });

    it('returns the same ghost interaction overlay when called multiple times before a mouse up event', () => {
      interactionOverlayGhoster.ghost = jest.fn(() => 'Ghost interaction overlay - 268ur84yg53j');

      expect(ghostInteractionOverlayProvider.provideCurrent()).toBe('Ghost interaction overlay - 268ur84yg53j');

      expect(interactionOverlayGhoster.ghost).toHaveBeenCalledTimes(1);

      expect(ghostInteractionOverlayProvider.provideCurrent()).toBe('Ghost interaction overlay - 268ur84yg53j');
      expect(ghostInteractionOverlayProvider.provideCurrent()).toBe('Ghost interaction overlay - 268ur84yg53j');
      expect(ghostInteractionOverlayProvider.provideCurrent()).toBe('Ghost interaction overlay - 268ur84yg53j');

      // was not called any more times
      expect(interactionOverlayGhoster.ghost).toHaveBeenCalledTimes(1);
    });

    it('ghosts the interaction overlay when called for the first time after a mouse up event', () => {
      interactionOverlayGhoster.ghost = () => ({
        textContent: 'Ghost interaction overlay - 1',
        remove: () => {},
      });

      expect(ghostInteractionOverlayProvider.provideCurrent().textContent).toBe('Ghost interaction overlay - 1');

      // change to return 2
      interactionOverlayGhoster.ghost = () => ({
        textContent: 'Ghost interaction overlay - 2',
        remove: () => {},
      });

      // still returning 1
      expect(ghostInteractionOverlayProvider.provideCurrent().textContent).toBe('Ghost interaction overlay - 1');
      expect(ghostInteractionOverlayProvider.provideCurrent().textContent).toBe('Ghost interaction overlay - 1');
      expect(ghostInteractionOverlayProvider.provideCurrent().textContent).toBe('Ghost interaction overlay - 1');

      mouseUpListener();

      // now returns 2
      expect(ghostInteractionOverlayProvider.provideCurrent().textContent).toBe('Ghost interaction overlay - 2');
    });
  });

  it('removes provided ghost interaction overlays on mouse up', () => {
    interactionOverlayGhoster.ghost = () => ({ remove: jest.fn() });

    let ghost = ghostInteractionOverlayProvider.provideCurrent();

    expect(ghost.remove).not.toHaveBeenCalled();
    mouseUpListener();
    expect(ghost.remove).toHaveBeenCalledTimes(1);
  });

  it('does nothing on mouse up when there is no ghost interaction overlay to remove', () => {
    // before any ghost interaction overlays have been created
    expect(() => mouseUpListener()).not.toThrow();

    ghostInteractionOverlayProvider.provideCurrent();

    // remove the provided ghost interaction overlay
    mouseUpListener();

    // there are no ghost interaction overlays to remove
    expect(() => mouseUpListener()).not.toThrow();
    expect(() => mouseUpListener()).not.toThrow();
    expect(() => mouseUpListener()).not.toThrow();
  });
});
