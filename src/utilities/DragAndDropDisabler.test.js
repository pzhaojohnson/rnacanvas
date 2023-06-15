import { DragAndDropDisabler } from './DragAndDropDisabler';

describe('DragAndDropDisabler class', () => {
  describe('applyTo method', () => {
    it('sets ondragstart and ondrop callbacks', () => {
      let ele = document.createElement('div');

      ele.ondragstart = null;
      ele.ondrop = null;

      expect(ele.ondragstart).toBe(null);
      expect(ele.ondrop).toBe(null);

      let disabler = new DragAndDropDisabler();
      disabler.applyTo(ele);

      expect(ele.ondragstart()).toBe(false);
      expect(ele.ondrop()).toBe(false);
    });
  });
});
