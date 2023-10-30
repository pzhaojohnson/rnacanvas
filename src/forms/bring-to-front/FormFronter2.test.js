import { FormFronter2 } from './FormFronter2';

describe('FormFronter2 class', () => {
  describe('bringToFront method', () => {
    it('brings the target form to the front when it is necessary', () => {
      let isNotNecessary = { isTrue: () => false };

      let bringToFront = { do: jest.fn() };

      let formFronter = new FormFronter2({ isNotNecessary, bringToFront });

      expect(bringToFront.do).not.toHaveBeenCalled();

      formFronter.bringToFront();

      expect(bringToFront.do).toHaveBeenCalledTimes(1);
    });

    it('does not bring the target form to the front when it is not necessary', () => {
      let isNotNecessary = { isTrue: () => true };

      let bringToFront = { do: jest.fn() };

      let formFronter = new FormFronter2({ isNotNecessary, bringToFront });

      formFronter.bringToFront();

      expect(bringToFront.do).not.toHaveBeenCalled();
    });
  });
});
