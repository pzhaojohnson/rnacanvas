import { InteractionOverlayGetter } from './InteractionOverlayGetter';

let app = null;

let interactionOverlayGetter = null;

beforeEach(() => {
  app = {
    drawingInteraction: {
      drawingOverlay: document.createElement('div'),
    },
  };

  interactionOverlayGetter = new InteractionOverlayGetter({ app });
});

afterEach(() => {
  interactionOverlayGetter = null;

  app = null;
});

describe('InteractionOverlayGetter class', () => {
  describe('get method', () => {
    it('returns the interaction overlay element', () => {
      app.drawingInteraction.drawingOverlay = document.createElement('p');
      app.drawingInteraction.drawingOverlay.textContent = 'The interaction overlay - 9832ryweiah';

      expect(interactionOverlayGetter.get().textContent).toMatch('The interaction overlay - 9832ryweiah');
    });
  });
});
