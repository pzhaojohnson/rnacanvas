import { FormFronter } from './FormFronter';

describe('FormFronter class', () => {
  describe('bringToFront method', () => {
    test('when the target form has a parent node', () => {
      let targetForm = {
        parentNode: {
          appendChild: jest.fn(),
        },
      };

      let formFronter = new FormFronter({ targetForm });

      expect(targetForm.parentNode.appendChild).not.toHaveBeenCalled();

      formFronter.bringToFront();

      expect(targetForm.parentNode.appendChild).toHaveBeenCalledTimes(1);
      expect(targetForm.parentNode.appendChild.mock.calls[0][0]).toBe(targetForm);
    });

    test('when the target form has a parent node of null', () => {
      let targetForm = {
        parentNode: null,
      };

      let formFronter = new FormFronter({ targetForm });

      expect(() => formFronter.bringToFront()).not.toThrow();
    });

    test('when the target form has an undefined parent node', () => {
      let targetForm = {
        parentNode: undefined,
      };

      let formFronter = new FormFronter({ targetForm });

      expect(() => formFronter.bringToFront()).not.toThrow();
    });
  });
});
