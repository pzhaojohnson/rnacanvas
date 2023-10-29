import { FormTranslater } from './FormTranslater';

describe('FormTranslater class', () => {
  describe('translate method', () => {
    it('translates the target form taking into account its prior translation', () => {
      let targetForm = { style: { translate: '' } };

      let currentTranslationMeasurer = {
        measure: () => ({ x: 1947.32, y: -37189 }),
      };

      let formTranslater = new FormTranslater({ targetForm, currentTranslationMeasurer });

      formTranslater.translate({ x: 469.2, y: 47283.5 });

      expect(targetForm.style.translate).toBe('2416.52px 10094.5px');
    });
  });
});
