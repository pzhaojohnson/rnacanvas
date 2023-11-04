import { DelayedTask } from './DelayedTask';

describe('DelayedTask class', () => {
  describe('do method', () => {
    it('sets a timeout that does the task-to-do after the specified delay', () => {
      let taskToDo = { do: jest.fn() };

      let delayedTask = new DelayedTask(taskToDo, 36172);

      window.setTimeout = jest.fn();

      delayedTask.do();

      expect(window.setTimeout).toHaveBeenCalledTimes(1);

      // waits the correct amount of time
      expect(window.setTimeout.mock.calls[0][1]).toBe(36172);

      // does the task-to-do
      expect(taskToDo.do).not.toHaveBeenCalled();
      window.setTimeout.mock.calls[0][0]();
      expect(taskToDo.do).toHaveBeenCalledTimes(1);
    });
  });
});
