import { ConditionalTask } from './ConditionalTask';

describe('ConditionalTask class', () => {
  describe('do method', () => {
    it('does the task when the condition is true', () => {
      let condition = { isTrue: () => true };
      let task = { do: jest.fn() };

      let conditionalTask = new ConditionalTask(condition, task);

      expect(task.do).not.toHaveBeenCalled();
      conditionalTask.do();
      expect(task.do).toHaveBeenCalledTimes(1);
    });

    it('does not do the task when the condition is false', () => {
      let condition = { isTrue: () => false };
      let task = { do: jest.fn() };

      let conditionalTask = new ConditionalTask(condition, task);

      conditionalTask.do();
      expect(task.do).not.toHaveBeenCalled();
    });
  });
});
