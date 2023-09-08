import { InteractionOverlayGetter } from './InteractionOverlayGetter';

let app = null;

let interactionOverlayGetter = null;

beforeEach(() => {
  app = {
    drawingInteraction: {
      drawingOverlay: {
        svg: {
          node: 'Interaction overlay node',
        },
      },
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
      app.drawingInteraction.drawingOverlay.svg.node = document.createElement('p');
      app.drawingInteraction.drawingOverlay.svg.node.textContent = 'Interaction overlay node - 9832ryweiah';

      expect(interactionOverlayGetter.get().textContent).toMatch('Interaction overlay node - 9832ryweiah');
    });
  });
});
