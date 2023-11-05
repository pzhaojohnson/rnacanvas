import { CallbackTask } from './CallbackTask';

describe('CallbackTask class', () => {
  describe('do method', () => {
    it('calls the callback function', () => {
      let callbackFn = jest.fn();

      let task = new CallbackTask(callbackFn);

      expect(callbackFn).not.toHaveBeenCalled();
      task.do();
      expect(callbackFn).toHaveBeenCalledTimes(1);
    });
  });
});
