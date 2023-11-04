import { ConditionalTask } from './ConditionalTask';

describe('ConditionalTask class', () => {
  describe('do method', () => {
    it('does the task when the condition is true', () => {
      let task = { do: jest.fn() };
      let condition = { isTrue: () => true };

      let conditionalTask = new ConditionalTask(task, condition);

      expect(task.do).not.toHaveBeenCalled();
      conditionalTask.do();
      expect(task.do).toHaveBeenCalledTimes(1);
    });

    it('does not do the task when the condition is false', () => {
      let task = { do: jest.fn() };
      let condition = { isTrue: () => false };

      let conditionalTask = new ConditionalTask(task, condition);

      conditionalTask.do();
      expect(task.do).not.toHaveBeenCalled();
    });
  });
});
