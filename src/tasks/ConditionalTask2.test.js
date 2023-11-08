import { ConditionalTask2 } from './ConditionalTask2';

describe('ConditionalTask2 class', () => {
  describe('do method', () => {
    it('does task 1 if the condition is true', () => {
      let task1 = { do: jest.fn() };
      let task2 = { do: jest.fn() };

      let condition = { isTrue: () => true };

      let conditionalTask = new ConditionalTask2(task1, condition, task2);

      expect(task1.do).not.toHaveBeenCalled();

      conditionalTask.do();

      expect(task1.do).toHaveBeenCalledTimes(1);
      expect(task2.do).not.toHaveBeenCalled();
    });

    it('does task 2 if the condition is false', () => {
      let task1 = { do: jest.fn() };
      let task2 = { do: jest.fn() };

      let condition = { isTrue: () => false };

      let conditionalTask = new ConditionalTask2(task1, condition, task2);

      expect(task2.do).not.toHaveBeenCalled();

      conditionalTask.do();

      expect(task1.do).not.toHaveBeenCalled();
      expect(task2.do).toHaveBeenCalledTimes(1);
    });
  });
});
