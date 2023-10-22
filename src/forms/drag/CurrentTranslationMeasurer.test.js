import { CurrentTranslationMeasurer } from './CurrentTranslationMeasurer';

describe('CurrentTranslationMeasurer class', () => {
  describe('measure method', () => {
    it('measures the current translation correctly', () => {
      let targetForm = {
        getBoundingClientRect: () => ({ x: 0, y: 0 }),
        style: {
          translate: '',
        },
      };

      targetForm.getBoundingClientRect = () => {
        if (targetForm.style.translate === 'none') {
          return { x: 489, y: 7184 };
        } else {
          return { x: -3891, y: 2177 };
        }
      };

      let currentTranslationMeasurer = new CurrentTranslationMeasurer({ targetForm });

      expect(currentTranslationMeasurer.measure()).toStrictEqual({
        x: (-3891) - 489,
        y: 2177 - 7184,
      });
    });

    it('does not modify the translation of the target form', () => {
      let targetForm = {
        getBoundingClientRect: () => ({ x: 0, y: 0 }),
        style: {
          translate: '18429px 3781px',
        },
      };

      let currentTranslationMeasurer = new CurrentTranslationMeasurer({ targetForm });

      currentTranslationMeasurer.measure();

      // is unchanged
      expect(targetForm.style.translate).toBe('18429px 3781px');
    });
  });
});
