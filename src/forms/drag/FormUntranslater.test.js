import { FormUntranslater } from './FormUntranslater';

describe('FormUntranslater class', () => {
  describe('untranslate method', () => {
    it('sets the translate CSS property of the target form to none', () => {
      let targetForm = {
        style: {
          translate: '',
        },
      };

      let formUntranslater = new FormUntranslater({ targetForm });

      targetForm.style.translate = '25px 50px';

      formUntranslater.untranslate();

      expect(targetForm.style.translate).toBe('none');
    });
  });
});
